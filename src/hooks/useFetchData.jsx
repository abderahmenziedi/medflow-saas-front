import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';

const useGetProfile = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || 'Failed to fetch data');
        }
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || 'Something went wrong');
      } 
    }
    
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

export default useGetProfile;