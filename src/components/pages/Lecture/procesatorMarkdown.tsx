import { ReactNode, useEffect, useState } from "react";

export const useCustomMarkdownRenderer = () => {
  const [wordSelected, setWordSelected] = useState<string | null>(null);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Function to handle voice load, ensuring voices are loaded before using them
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      let voicesList = synth.getVoices();

      // If voices are not loaded yet, wait for them
      if (voicesList.length === 0) {
        synth.onvoiceschanged = () => {
          voicesList = synth.getVoices();
          setVoices(voicesList);
        };
      } else {
        setVoices(voicesList);
      }
    };

    loadVoices();
  }, []);

  const handleWordClick = (word: string): void => {
    // Remove dots, commas, and other punctuation
    setWordSelected(word.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, ""));
    const synth = window.speechSynthesis;

    // Cancel any ongoing speech before starting a new one
    synth.cancel();

    // Crear el utterance usando la voz seleccionada del estado global
    const utterance = new SpeechSynthesisUtterance(word);

    // Si hay una voz seleccionada, usarla. De lo contrario, usar la primera voz disponible
    utterance.voice = voices[0];
    utterance.lang = "en-US"; // Usa el idioma de la voz seleccionada
    synth.speak(utterance);
  };

  // Function to split text into clickable spans for words
  const makeTextClickable = (text: string): ReactNode[] => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className="cursor-pointer hover:underline"
        onDoubleClick={() => handleWordClick(word)}
      >
        {word}{" "}
      </span>
    ));
  };

  // Custom rendering function for markdown components
  const customComponents = {
    p: ({ children }: { children: ReactNode }) => (
      <p>
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </p>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <li>
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </li>
    ),
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="text-2xl font-bold">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="text-xl font-semibold">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-lg font-medium">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </h3>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <h4 className="text-md font-medium">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </h4>
    ),
    ul: ({ children }: { children: ReactNode }) => <ul>{children}</ul>,
    ol: ({ children }: { children: ReactNode }) => <ol>{children}</ol>,
    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </blockquote>
    ),
    code: ({ children }: { children: ReactNode }) => (
      <code className="bg-gray-100 p-1 rounded">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </code>
    ),
    pre: ({ children }: { children: ReactNode }) => (
      <pre className="bg-gray-100 p-2 rounded">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </pre>
    ),
    strong: ({ children }: { children: ReactNode }) => (
      <strong>
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </strong>
    ),
    em: ({ children }: { children: ReactNode }) => (
      <em>
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </em>
    ),
    a: ({ href, children }: { href: string; children: ReactNode }) => (
      <a href={href} className="text-blue-500 hover:underline">
        {Array.isArray(children)
          ? children.map((child) =>
              typeof child === "string" ? makeTextClickable(child) : child
            )
          : typeof children === "string"
          ? makeTextClickable(children)
          : children}
      </a>
    ),
    img: ({ src, alt }: { src: string; alt?: string }) => (
      <img src={src} alt={alt} className="my-4 rounded" />
    ),
  };

  return { customComponents, handleWordClick, makeTextClickable, wordSelected };
};
