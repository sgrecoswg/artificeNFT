import { useState, useEffect } from "react";

const useFetch = (url) =>{
    const [data,setData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { // Runs every time a render executed. DON'T change the state inside useEffect function! Good function for fetching data.
        const abortCont = new AbortController();

        setTimeout(() => { // Let the "Loading..." text to be more visable for 1 second and only then show the data.
            fetch(url, {signal: abortCont.signal})
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                } 
                else {
                    setIsPending(false);
                    setError(err.message);
                }
            })
        }, 1000);

        return () => abortCont.abort();
    }, [url]);
    
    return {data, isPending, error}
}

export default useFetch;