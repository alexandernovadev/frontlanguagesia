
export const getLevelColor = (level: string | undefined) => {
  switch (level?.toLowerCase()) {
    case "easy":
      return "#047857"; // Tailwind green-700
    case "medium":
      return "#1d4ed8"; // Tailwind blue-700
    case "hard":
      return "#b91c1c"; // Tailwind red-700
    default:
      return "#9ca3af"; // Tailwind gray-400
  }
};
