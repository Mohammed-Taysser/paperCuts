import { useState, useEffect } from 'react';
import axios from 'axios';

const defaultConfig = {
  url: 'http://localhost:8080/db',
  method: 'get',
  body: null,
  headers: null,
};

/**
 * We create useAxios hook in the following steps:
 * 
 * 1. Do the api call from a component using axios.
 * 2. Add states for the API response, loading and error.
 * 3. Create a hook for calling an API using all above.
 * 4. Make the hook dynamic, to call all types of API methods
 * 
 * @usage
 * ```js
  const { response, loading, error } = useAxios({
    method: 'post',
    url: '/posts',
    headers: { accept: '*' },
    body: {
      userId: 1,
      id: 19392,
      title: 'title',
      body: 'Sample text',
    },
  });

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  {loading ? (
    <p>loading...</p>
  ) : (
    <div>
      {error && <div> {error.message} </div> }
      <div>{data && <p>{data.id}</p>}</div>
    </div>
  )}
 * ```
  @see https://dev.to/ms_yogii/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj
 * @param {Object} config use to set axios config
 * @returns {Object} response & error message & headers
 */
function useAxios(config = defaultConfig) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await axios
      .request(config)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
}

export default useAxios;
