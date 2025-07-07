import React, { useEffect, useState } from 'react'

 export default function useFetch(url, options={}) {
    const [data, setData] = useState(null);
    useEffect(()=>{
        const fetchData = () => {
            fetch(url, options)
                .then(res => res.json())
                .then(resData => setData(resData))
                .catch(err => console.log("Error fetching data: ", err));
        }
        fetchData();
    }, [url, JSON.stringify(options)]);

    return {data};
}