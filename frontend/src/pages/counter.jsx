import React from 'react'
import { increment, logData } from '../redux/slice'
import { useSelector, useDispatch } from 'react-redux'

export const counter = () => {
    const count = useSelector((state)=>{state.counter.value});
    const dispatch = useDispatch();

  return (
    <>    <div>counter : {count}</div>
        <button onClick={()=>{dispatch(logData())}}>Data Log</button>

    <button onClick={()=>{dispatch(increment())}}>increment</button>
 </>
 )
}
