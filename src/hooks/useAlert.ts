import { useState, useCallback } from 'react';
import { StateAlertProps } from '../Interfaces/Interface.types';

const useAlert = () => {
  const [alertState, setAlertState] = useState<StateAlertProps>({ message: null, captchaSrc: undefined });

  const setAlert = useCallback((message: string) => {
    const [alert, src] = message.split(' ').length > 2
      ? [message.split(' ')[0] + ' ' + message.split(' ')[1], message.split(' ')[2]]
      : [message, undefined];
    setAlertState({ message: alert, captchaSrc: src });
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlertState({ message: null, captchaSrc: undefined });
  }, []);

  return { alertState, setAlert, handleCloseAlert };
};

export default useAlert;
