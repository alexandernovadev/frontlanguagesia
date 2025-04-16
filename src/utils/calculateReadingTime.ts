/**
 * Calculates the estimated reading time for a given text in minutes.
 * The calculation is based on an average reading speed, which can be adjusted.
 *
 * @param {string} text - The input text for which to calculate the reading time.
 * @returns {number} The estimated reading time in minutes, rounded up to the nearest integer.
 * @example
 * calculateReadingTime("This is a short text with 7 words.");
 * Returns: 1 (since 7 words / 225 words per minute = ~0.03, rounded up to 1)
 */
export const calculateReadingTime = (text: string) => {
  // You can adjust this value based on the students' level
  const wordsPerMinute = 225;

  // Count the number of words
  const words = text.split(/\s+/).length;

  // Calculate the time and round up to the nearest integer
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};
