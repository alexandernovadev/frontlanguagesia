import { Loader } from "lucide-react";

export const Loading = () => (
  <div className="flex justify-center items-center pt-32 text-green-500 ">
    <Loader className="animate-spin mr-2" />
    <span>Loading...</span>
  </div>
);
