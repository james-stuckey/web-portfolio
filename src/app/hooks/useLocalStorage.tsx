import { useEffect, useState } from "react";

export const usePersistedState = (key: any, initialValue: any) => {
	const [value, setValue] = useState(() => {
	  if (typeof window !== 'undefined') {

		return JSON.parse(localStorage.getItem(key)) || initialValue;
	  }
	  return initialValue;
	});
  
	useEffect(() => {
	  localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
  
	return [value, setValue];
};

