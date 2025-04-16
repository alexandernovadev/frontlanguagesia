import { BACKURL } from "../api/backConf";
import { Word } from "../models/Word";

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || `Error: ${response.statusText}`);
  }
  return data;
};

export const wordService = {
  getWords: async (page: number, limit: number, wordUser?: string) => {
    const url = `${BACKURL}/api/words?page=${page}&limit=${limit}${
      wordUser ? `&wordUser=${wordUser}` : ""
    }`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  getWordById: async (id: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}`);
    return handleResponse(response);
  },

  getWordByName: async (word: string) => {
    const response = await fetch(`${BACKURL}/api/words/word/${word}`);
    return handleResponse(response);
  },

  createWord: async (wordData: Omit<Word, "_id">) => {
    const response = await fetch(`${BACKURL}/api/words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordData),
    });
    return handleResponse(response);
  },

  updateWord: async (id: string, wordData: Partial<Word>) => {
    const response = await fetch(`${BACKURL}/api/words/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordData),
    });
    return handleResponse(response);
  },

  updateWordLevel: async (id: string, level: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}/level`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level }),
    });
    return handleResponse(response);
  },

  incrementWordSeen: async (id: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}/increment-seen`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse(response);
  },

  deleteWord: async (id: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  getRecentHardOrMediumWords: async () => {
    const response = await fetch(`${BACKURL}/api/words/get-cards-anki`);
    return handleResponse(response);
  },
};
