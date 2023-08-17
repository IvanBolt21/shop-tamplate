import React from 'react'
import { useState, useEffect } from 'react'

export default function useDeferedInput(defaultValue, delay = 100) {
    const [value, setValue] = useState(defaultValue);
    const [deferedValue, setDeferedValue] = useState(defaultValue);
 
    useEffect(()=>{
        const interval = setTimeout( ()=>{
                setDeferedValue(value);
            }, delay)
        return ()=>{
            clearTimeout(interval);
        }
    },[value])

  return [value, deferedValue, setValue];
}
