export function getValueFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}