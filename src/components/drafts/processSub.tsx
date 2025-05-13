import { useMemo } from 'react';

export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

export interface Segment {
  start: number;
  end: number;
  text: string;
}

export const processSubtitles = (segments: Segment[]): WordTiming[] => {
  return useMemo(() => {
    const wordsWithTimings: WordTiming[] = [];

    segments.forEach((segment: Segment) => {
      const { start, end, text } = segment;
      const words: string[] = text.match(/[\w'-]+|[.,!?;"]/g) || [];

      if (words.length === 0) return;

      const totalChars: number = words.reduce(
        (sum: number, word: string) => sum + word.length,
        0
      );
      const duration: number = end - start;

      if (duration > 0 && totalChars > 0) {
        let accumulatedTime: number = start;

        words.forEach((word: string) => {
          const isPunctuation = /^[.,!?;"]$/.test(word);
          const wordDuration = isPunctuation
            ? 0.01 // Duración mínima para puntuaciones
            : (word.length / totalChars) * duration;

          const wordStart: number = accumulatedTime;
          const wordEnd: number = Math.min(wordStart + wordDuration, end);

          wordsWithTimings.push({
            word,
            start: wordStart,
            end: wordEnd,
          });

          accumulatedTime = wordEnd;
        });
      }
    });

    return wordsWithTimings;
  }, [segments]);
};
