import React, { useEffect, useState, useRef, useCallback, } from 'react';

export function useTimeout(callBack, delay) {
    const callbackRef = useRef(callBack);
    const timeOutRef = useRef();

    useEffect(() => {
        callbackRef.current = callBack;
    }, [callback]);


    const set = useCallback(() => {

        timeoutRef.current = setTimeout(() =>  callbackRef.current() ,delay);
    });

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);

    });

    useEffect(() => {
        set();
        return clear;

    }, [delay, set, clear]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]); 

    return {reset,clear};
}


export function useDebounce(callback,delay,dependencies) {
    const { rest, clear } = useTimeout(callback, delay);

    useEffect(reset,[...dependencies,reset]);

    useEffect(clear,[]);
}

export function useUpdateEffect(callback, dependencies) {
    const firstRenderRef = useRef(this);
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    },dependencies);
}


export function useArray(defaultValues) {
    const [array, setArray] = useState(defaultValues);

    function push(element) { setArray(a => [...a], element); }

    function filter(callback) { setArray(a => a.filter(callback)); }

    function update(index, newElement) {
        setArray(a => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index+1,a.length-1)
        ]);
    }

    function remove(index) {
        setArray(
            ...a.slice(0, index),
            ...a.slice(index+1,a,length-1)
        );
    }

    function clear() { setArray([]);}

    return {array,set:setArray,push,filter,update,remove,clear};
}







