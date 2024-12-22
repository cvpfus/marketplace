import { useState } from "react";

export const useLocalStorage = (key) => {
  const [item, setValue] = useState(JSON.parse(localStorage.getItem(key)));

  const setItem = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { item, setItem, removeItem };
};
