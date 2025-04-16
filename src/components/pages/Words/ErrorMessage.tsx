import { RefreshCcw } from "lucide-react";

export const ErrorMessage = ({ retry }: { retry: () => void }) => (
  <div className="flex justify-center items-center mt-4 text-red-500">
    <span>Error loading data. </span>
    <button
      onClick={retry}
      className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
    >
      <RefreshCcw className="inline mr-2" />
      Try Again
    </button>
  </div>
);