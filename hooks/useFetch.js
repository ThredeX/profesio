import { useState, useEffect } from 'react'

export const useFetch = url => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([])

    useEffect(() => {
        if(!url) return null;

        fetch(url)
            .then(res => res.json())
            .then(fetchedData => {
                setData(fetchedData);
                setStatus('OK');
            })
            .catch(err => setStatus(err.status))
    }, [url])
    return [data, status]
}