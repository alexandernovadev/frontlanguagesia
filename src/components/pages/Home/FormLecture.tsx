import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2, Sparkles } from "lucide-react";

import Input from "../../ui/Input";
import { TextAreaCustom } from "../../ui/TextArea";
import { Card as CardType } from "./types/types";
import { useLectureStore } from "../../../store/useLectureStore";

import noImage from "../../../../public/images/noImage.png";
import { BACKURL } from "../../../api/backConf";

interface FormLectureProps {
  lecture: CardType;
  onClose: () => void;
}

export const FormLecture: React.FC<FormLectureProps> = ({
  lecture,
  onClose,
}) => {
  const { control, handleSubmit, getValues } = useForm<CardType>({
    defaultValues: lecture,
  });

  const { actionLoading, putLectureImage, putLecture, updateUrlAudio } =
    useLectureStore();

  const onSubmit: SubmitHandler<CardType> = async (data) => {
    await putLecture(lecture._id! as string, data);
    onClose();
  };

  const handleGenerateImage = async () => {
    const { content, img } = getValues();

    if (!content) {
      alert("Lecture content is required to generate an image.");
      return;
    }

    await putLectureImage(lecture._id! as string, content, img || "");
  };

  const handleupdateUrlAudioGpt = async () => {
    await updateUrlAudio(lecture._id! as string, lecture.urlAudio || "");
  };

  // Disable all fields when loading
  const isDisabled = actionLoading.putImage;

  return (
    <div
      aria-labelledby="edit-lecture"
      className="bg-customBlack-200 p-4 md:p-8 rounded-lg w-full h-full max-w-5xl max-h-[95vh] overflow-y-auto"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-6 w-full h-full"
      >
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="time" className="text-white block mb-1">
                Duration (minutes)
              </label>
              <Input
                name="time"
                control={control}
                placeholder="Time (min)"
                type="number"
                disabled
              />
            </div>
            <div>
              <label htmlFor="level" className="text-white block mb-1">
                Difficulty Level
              </label>
              <Input
                name="level"
                control={control}
                placeholder="Level"
                disabled
              />
            </div>
            <div>
              <label htmlFor="language" className="text-white block mb-1">
                Language
              </label>
              <Input
                name="language"
                control={control}
                placeholder="Language"
                disabled
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label
              htmlFor="img"
              className="text-white flex justify-between mb-1"
            >
              Image URL
              <button
                type="button"
                onClick={handleGenerateImage}
                className="text-white p-1 m-1 rounded-full border border-white transition flex items-center gap-2"
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <Sparkles size={18} className="animate-pulse" />
                ) : (
                  <Sparkles size={18} />
                )}
              </button>
            </label>
            <Input
              name="img"
              control={control}
              placeholder="Image URL"
              disabled={isDisabled}
            />
          </div>

          {/* Audio URL */}
          <div className="mb-4">
            <label
              htmlFor="img"
              className="text-white flex justify-between mb-1"
            >
              Audio URL
              <button
                type="button"
                onClick={handleupdateUrlAudioGpt}
                className="text-white p-1 m-1 rounded-full border border-white transition flex items-center gap-2"
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <Sparkles size={18} className="animate-pulse" />
                ) : (
                  <Sparkles size={18} />
                )}
              </button>
            </label>
            <Input
              name="urlAudio"
              control={control}
              placeholder="Audio URL"
              disabled={isDisabled}
            />
            {/* Render audio if URL exists */}
            {lecture.urlAudio && lecture.urlAudio.trim() !== "" && (
              <audio controls className="mt-2">
                <source src={`${BACKURL}${lecture.urlAudio}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
          
          {/* Image Preview */}
          <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
            {lecture.img ? (
              <img
                src={lecture.img}
                alt="Lecture"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={noImage}
                alt="Lecture"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1">
            <label htmlFor="content" className="text-white block mb-1">
              Lecture Content
            </label>
            <TextAreaCustom
              name="content"
              control={control}
              placeholder="Lecture Content"
              className="min-h-[300px] md:min-h-full mb-2"
              disabled={isDisabled}
            />
          </div>

          <div className="h-1"></div>

          {/* Save Button Aligned Bottom */}
          <div className="mt-auto flex justify-center items-center">
            <button
              type="submit"
              className="w-full bg-green-800 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition flex justify-center items-center"
              disabled={actionLoading.put || isDisabled}
            >
              {actionLoading.put ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
