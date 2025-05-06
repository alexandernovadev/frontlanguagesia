import { BACKURL } from "../api/backConf";
import { Word } from "../models/Word";
import { handleResponse } from "./utils/handleResponse";
import { getAuthHeaders } from "./utils/headers";

export const wordService = {
  getWords: async (page: number, limit: number, wordUser?: string) => {
    const url = `${BACKURL}/api/words?page=${page}&limit=${limit}${
      wordUser ? `&wordUser=${wordUser}` : ""
    }`;
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getWordById: async (id: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getWordByName: async (word: string) => {
    const response = await fetch(`${BACKURL}/api/words/word/${word}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createWord: async (wordData: Omit<Word, "_id">) => {
    const response = await fetch(`${BACKURL}/api/words`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(wordData),
    });
    return handleResponse(response);
  },

  updateWord: async (id: string, wordData: Partial<Word>) => {
    const response = await fetch(`${BACKURL}/api/words/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(wordData),
    });
    return handleResponse(response);
  },

  updateWordLevel: async (id: string, level: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}/level`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ level }),
    });
    return handleResponse(response);
  },

  incrementWordSeen: async (id: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}/increment-seen`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  deleteWord: async (id: string) => {
    const response = await fetch(`${BACKURL}/api/words/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getRecentHardOrMediumWords: async () => {
    const response = await fetch(`${BACKURL}/api/words/get-cards-anki`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  generateWordJSON: async (prompt: string, language = "en") => {
    const response = await fetch(`${BACKURL}/api/ai/generate-wordJson`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ prompt, language }),
    });
    return handleResponse(response);
  },
};
