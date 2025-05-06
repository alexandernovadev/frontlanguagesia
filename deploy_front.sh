#!/bin/bash
set -euo pipefail

trap 'echo "❌ Error en la línea $LINENO. Abortando despliegue." >&2; exit 1' ERR

echo "🚀 Iniciando script de despliegue del frontend..."

# Verificar si Yarn está instalado
if ! command -v yarn &> /dev/null; then
    echo "❌ Error: Yarn no está instalado. Instálalo con 'npm install -g yarn'" >&2
    exit 1
fi

# Verificar si jq está instalado (necesario para leer package.json)
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq no está instalado. Instálalo con 'sudo apt install jq'" >&2
    exit 1
fi

# Verificar que package.json exista
if [[ ! -f package.json ]]; then
    echo "❌ Error: No se encontró package.json" >&2
    exit 1
fi

# Restaurar el repositorio a su estado original
echo "🔄 Restaurando el repositorio..."
git reset --hard
git clean -fd

# Leer versión desde package.json
PACKAGE_VERSION=$(jq -r .version package.json)
DATE_FORMAT=$(TZ="America/Bogota" date +"Date 1 %B %d(%A) ⏰ %I:%M:%S %p - %Y 1 - V.$PACKAGE_VERSION")

# Actualizar VITE_VERSION en .env
if [[ -f .env ]]; then
    echo "✍️  Actualizando VITE_VERSION en .env..."
    sed -i "s/^VITE_VERSION=.*/VITE_VERSION=\"$DATE_FORMAT\"/" .env || {
        echo "⚠️  No se pudo actualizar VITE_VERSION en .env. ¿Está definida?" >&2
    }
else
    echo "⚠️  Archivo .env no encontrado. Saltando actualización de VITE_VERSION." >&2
fi

# Eliminar node_modules y locks
echo "🧹 Limpiando node_modules y archivos de lock..."
rm -rf node_modules package-lock.json yarn.lock

# Instalar dependencias
echo "📦 Instalando dependencias con Yarn..."
yarn install --frozen-lockfile

# Compilar TypeScript antes de hacer el build (mejor diagnóstico)
echo "🔍 Compilando TypeScript..."
if ! yarn tsc -b; then
    echo "❌ Falló la compilación de TypeScript" >&2
    exit 1
fi

# Generar build de producción
echo "⚙️  Ejecutando build de Vite..."
if ! yarn vite build; then
    echo "❌ Falló la construcción con Vite" >&2
    exit 1
fi

# Validar existencia del directorio de build
if [[ ! -d dist ]]; then
    echo "❌ Error: El directorio 'dist' no fue generado." >&2
    exit 1
fi

# Desplegar en el servidor web
DEPLOY_PATH="/var/www/languages-ai"
echo "🚀 Desplegando en $DEPLOY_PATH..."
sudo rm -rf "$DEPLOY_PATH"/*
sudo cp -r dist/* "$DEPLOY_PATH"

# Ajustar permisos
echo "🔧 Ajustando permisos de archivos..."
sudo chown -R www-data:www-data "$DEPLOY_PATH"
sudo chmod -R 755 "$DEPLOY_PATH"

# Reiniciar Nginx
echo "🔄 Reiniciando Nginx..."
sudo systemctl restart nginx

# Restaurar repositorio una vez más por seguridad
echo "🔄 Restaurando nuevamente el repositorio a estado limpio..."
git reset --hard
git clean -fd

echo "✅ Despliegue del frontend completado con éxito!"