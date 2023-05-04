export const setItemStorage = (key: string, value: object) => localStorage.setItem(key, JSON.stringify(value));

export const getItemStorage = (key: string) => {
  const item = localStorage.getItem(key);
  
  return item ? JSON.parse(item) : null;
}

export const removeItemStorage = (key: string) => localStorage.removeItem(key);
