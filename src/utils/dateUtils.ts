import { FormattedDate } from "../Interfaces/Interface.types";

export const formatDate = (isoDateString: string): FormattedDate => {
    const date = new Date(isoDateString);

    date.setHours(date.getHours() + 6);
    
    const time = date.toISOString().slice(11, 16);
  
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const formattedDate = `${day}-${month}-${year}`;
  
    return { time, date: formattedDate };
  };
  