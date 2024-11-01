// src/hooks/useFetchFeedback.ts
import { useCallback, useState } from 'react';
import { Vacancy } from '../Interfaces/InterfaceVacancy.types';
import useApi from '../api/api';

const useFetchFeedback = () => {
  const [chats, setChats] = useState<Vacancy[]>([]);
  const { loading, error, request } = useApi();

  const fetchFeedback = useCallback(async () => {
    try {
      const data = await request('get', '/feedback');
      setChats(data);
    } catch { }
  }, [request]);

  const deleteFeedback = useCallback(async (id: number) => {
    try {
      await request('delete', `/feedback${id}`);
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
    } catch { }
  }, [request]);

  return { chats, loading, error, fetchChats: fetchFeedback, deleteChat: deleteFeedback };
};

export default useFetchFeedback;
