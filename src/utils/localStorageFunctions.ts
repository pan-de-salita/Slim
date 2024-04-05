const storeInLocalStorage = <T>(key: string, value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key: string) => {
      const item = localStorage.getItem(key);

      if (item) {
            return JSON.parse(item);
      }

      return null;
}
