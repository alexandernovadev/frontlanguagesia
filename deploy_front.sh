#!/bin/bash
set -e  # Detener el script si hay un error

# Verificar si Yarn está instalado
if ! command -v yarn &> /dev/null; then
    echo "❌ Error: Yarn no está instalado. Instálalo con 'npm install -g yarn'"
    exit 1
fi

# Hacer un hard reset de Git para evitar cambios no deseados
echo "🔄 Restaurando la rama a su estado original..."
git reset --hard
git clean -fd  # Elimina archivos no versionados

# Obtener versión desde package.json y formatear la fecha
PACKAGE_VERSION=$(jq -r .version package.json)
DATE_FORMAT=$(TZ="America/Bogota" date +"Date 1 %B %d(%A) ⏰ %I:%M:%S %p - %Y 1 - V.$PACKAGE_VERSION")

# Sobrescribir VITE_VERSION en .env
echo "✍️  Actualizando VITE_VERSION en .env..."
sed -i "s/^VITE_VERSION=.*/VITE_VERSION=\"$DATE_FORMAT\"/" .env

# Eliminar archivos que puedan causar conflictos
echo "🧹 Eliminando node_modules y lock files..."
rm -rf node_modules package-lock.json yarn.lock

# Instalar dependencias
echo "📦 Instalando dependencias..."
yarn install

# Construir el proyecto
echo "⚙️  Generando build de producción..."
yarn build

# Mover archivos de build al servidor web
echo "🚀 Desplegando en /var/www/languages-ai..."
sudo rm -rf /var/www/languages-ai/*
sudo cp -r dist/* /var/www/languages-ai/

# Asegurar permisos correctos
echo "🔧 Ajustando permisos..."
sudo chown -R www-data:www-data /var/www/languages-ai
sudo chmod -R 755 /var/www/languages-ai

# Reiniciar Nginx para aplicar cambios
echo "🔄 Reiniciando Nginx..."
sudo systemctl restart nginx

# Hacer un hard reset nuevamente por seguridad
echo "🔄 Restaurando nuevamente el estado del repositorio..."
git reset --hard
git clean -fd

echo "✅ Despliegue del frontend completado con éxito!"
