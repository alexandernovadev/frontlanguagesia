/**
 * Creates a debounced version of a function that delays its execution until after a specified wait time has elapsed
 * since the last time it was invoked. Useful for limiting the rate at which a function is called, such as in search inputs
 * or window resize event handlers.
 *
 * @template T - The type of the function to debounce, which must extend a function that takes any arguments and returns void.
 * @param {T} func - The function to debounce. This function will only be executed after the delay has passed without new calls.
 * @param {number} delay - The number of milliseconds to wait before executing the function after the last call.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the input function that accepts the same arguments as `func`.
 * @example
 * Example usage with a search function
 * const logSearch = (query: string) => console.info("Searching for:", query);
 * const debouncedSearch = debounce(logSearch, 300);
 * 
 * debouncedSearch("cat"); // Nothing logged yet
 * debouncedSearch("cats"); // Nothing logged yet
 * After 300ms of no calls, logs: "Searching for: cats"
 */
type DebounceFunction<T extends (...args: any[]) => void> = (
  func: T,
  delay: number
) => (...args: Parameters<T>) => void;

export const debounce: DebounceFunction<(query: string) => void> = (func, delay) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};