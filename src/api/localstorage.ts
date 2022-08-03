export function storeData(key: string, data: any) {
    const STORAGE_KEY = `APP-${key}`;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      return null
    }
    
  }
  
  export function retriveData(key: string) {
    const STORAGE_KEY = `APP-${key}`;
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }