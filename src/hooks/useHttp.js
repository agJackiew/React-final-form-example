import { useCallback, useState } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const sendRequest = useCallback(
    async (url, method, headers, body, applyData) => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          method: method ? method : 'GET',
          headers: headers ? headers : {},
          body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
          const data = await response.json();

          const errMsg =
            Object.keys(data).toString() +
            ':\n' +
            Object.values(data).toString();
          throw new Error(errMsg || 'Request failed');
        }

        const data = await response.json();
        applyData(data);
      } catch (error) {
        setHttpError(error.message || 'Unidentified error');
      }
      setLoading(false);
    },
    []
  );

  return {
    loading,
    httpError,
    sendRequest
  };
};

export default useHttp;
