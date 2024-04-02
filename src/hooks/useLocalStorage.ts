import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue));
	}, [storedValue, setStoredValue]);

	return [storedValue, setStoredValue];
}

export default useLocalStorage;
