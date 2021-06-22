class LocalStorageService {
  static get<T>(key: string): T {
    const value = localStorage.getItem(key);

    if (value) return JSON.parse(value);
    throw new Error(`Item not found: ${key} `);
  }

  static save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default LocalStorageService;
