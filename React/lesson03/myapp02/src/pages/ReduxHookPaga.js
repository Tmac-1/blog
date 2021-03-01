import React, { useCallback } from 'react';
// import { useSelector,useDispatch  } from 'react-redux';
import { useSelector,useDispatch  } from '../KReactRedux';

export default function ReactReduxHookPage(props) {
    const count = useSelector(({count})=>count)
    const dispatch = useDispatch()
    const add = useCallback(()=>{
        dispatch({type:"ADD"})
    },[])
    return(
        <div>
            <div>ReactReduxHookPage</div>
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    )
}