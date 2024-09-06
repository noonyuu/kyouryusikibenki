interface LocalStorage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

export const localStorage: LocalStorage = {
  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  },
  getItem(key: string) {
    return window.localStorage.getItem(key);
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
  },
};
