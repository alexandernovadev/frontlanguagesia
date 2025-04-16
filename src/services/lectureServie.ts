import { BACKURL } from "../api/backConf";
import { Lecture } from "../models/Lecture";

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || `Error: ${response.statusText}`);
  }
  return data;
};

export const lectureService = {
  async getLectures(page = 1, limit = 10) {
    const res = await fetch(
      `${BACKURL}/api/lectures?page=${page}&limit=${limit}`
    );
    return handleResponse(res);
  },

  async getLectureById(id: string) {
    const res = await fetch(`${BACKURL}/api/lectures/${id}`);
    return handleResponse(res);
  },

  async postLecture(lectureData: Lecture) {
    const res = await fetch(`${BACKURL}/api/lectures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lectureData),
    });
    return handleResponse(res);
  },

  async putLecture(id: string, lectureData: Lecture) {
    const res = await fetch(`${BACKURL}/api/lectures/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lectureData),
    });
    return handleResponse(res);
  },

  async putLectureImage(id: string, lectureString: string, imgOld: string) {
    const trimmedLectureString = lectureString.slice(0, 3500);
    const res = await fetch(`${BACKURL}/api/ai/generate-image-lecture/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lectureString: trimmedLectureString, imgOld }),
    });
    return handleResponse(res);
  },

  async deleteLecture(id: string | number) {
    const res = await fetch(`${BACKURL}/api/lectures/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },
};
