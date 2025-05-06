import { BACKURL } from "../api/backConf";
import { Lecture } from "../models/Lecture";
import { handleResponse } from "./utils/handleResponse";
import { getAuthHeaders } from "./utils/headers";

export const lectureService = {
  async getLectures(page = 1, limit = 10) {
    const res = await fetch(
      `${BACKURL}/api/lectures?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(res);
  },

  async getLectureById(id: string) {
    const res = await fetch(`${BACKURL}/api/lectures/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  async postLecture(lectureData: Lecture) {
    const res = await fetch(`${BACKURL}/api/lectures`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(lectureData),
    });
    return handleResponse(res);
  },

  async updateLectureAudioUrl(id: string, audioUrl: string, voice = "nova") {
    const res = await fetch(`${BACKURL}/api/lectures/generateAudio/${id}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldUrl: audioUrl, voice }),
    });
    return handleResponse(res);
  },

  async putLecture(id: string, lectureData: Lecture) {
    const res = await fetch(`${BACKURL}/api/lectures/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(lectureData),
    });
    return handleResponse(res);
  },

  async putLectureImage(id: string, lectureString: string, imgOld: string) {
    const trimmedLectureString = lectureString.slice(0, 3500);
    const res = await fetch(`${BACKURL}/api/ai/generate-image-lecture/${id}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ lectureString: trimmedLectureString, imgOld }),
    });
    return handleResponse(res);
  },

  async deleteLecture(id: string | number) {
    const res = await fetch(`${BACKURL}/api/lectures/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};
