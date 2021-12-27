export const create = (str) => document.createElement(str);
export const select = (str) => document.querySelector(str);
export const selectAll = (str) => document.querySelectorAll(str);
export const truncateText = (str, numberOfWordsToKeep) => {
  return `${str.split(" ").splice(0, numberOfWordsToKeep).join(" ")}...`;
};
export const capitalizeString = (str) =>
  `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
