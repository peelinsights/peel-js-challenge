
// fetchStats.js
import  { useState, useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
     fetchStatsPending,
     fetchStatsSuccess, 
     fetchStatsError,
     pushStackSuccess,
     cleanStackError,
     popStack,
     pushStackError} from '@actions';
import statsService from '@services/stats.services'
import createCounter from '@util/createCounter.util'
import {INITIAL_STATS_AMOUNT,AMOUNT_PER_FETCH,CLIENT_LOAD_AMOUNT} from '@constants/'



 export function useFetchStats () {

    const [refetch,setRefetch] = useState(false)
    const dispatch = useDispatch();
    const {data,next_cursor,count} = useSelector(state=>state.stats,stats=>stats.data.lenght)
    const errors = useSelector(state=>state.stack.error,error=>error.lenght)
    const stackCursor = useSelector(state=>state.stack.stack_cursor,stack_cursor=>stack_cursor)
    const stat = useSelector(state=>state.stack.success[next_cursor],stack=>stack[next_cursor])

    const retryErrors = useCallback(()=>{
        dispatch(cleanStackError())
        Promise.all(
            Object.keys(errors).map( async (actualCursor)=>{
                try{
                    const res = await statsService(actualCursor)
                    if(res.error) {
                        throw(res.error);
                    }
                    dispatch(pushStackSuccess({actual_cursor:actualCursor,res:res}));
                }
                catch(error) {
                    const errorCode =  (error.response && error.response.status) || 500
                    const errorObj = {actual_cursor:actualCursor,errorMsg:errorCode}
                    dispatch(pushStackError(errorObj))
                }
        }))
    },[errors,dispatch])

    const loadMore = useCallback(async ()=>{
        const cursors = createCounter(AMOUNT_PER_FETCH,stackCursor+CLIENT_LOAD_AMOUNT,stackCursor)
        console.log('loadMore',cursors)
        await Promise.all(
            cursors.map(async (actualCursor)=>{
                try{
                    const res = await statsService(actualCursor)
                    if(res.error) {
                        throw(res.error);
                    }
                    dispatch(popStack(actualCursor))
                    dispatch(pushStackSuccess({actual_cursor:actualCursor,res:res}));
                }
                catch(error) {
                    const errorCode =  (error.response && error.response.status) || 500
                    const errorObj = {actual_cursor:actualCursor,errorMsg:errorCode}
                    dispatch(pushStackError(errorObj))
                }
            })
        )
        
    },[dispatch,stackCursor])

    const  boundAction =  useCallback(async ()=>{
        if(stat && refetch){
            const {actual_cursor} = stat
            setRefetch(false)
            dispatch(fetchStatsSuccess(stat.res))
            dispatch(popStack(actual_cursor))
            retryErrors()  
            loadMore()
        }
        else{
            fetchStatsPending()
            try{
                const res = await statsService(next_cursor)
                if(res.error) {
                    throw(res.error);
                }
                setRefetch(false)
                dispatch(fetchStatsSuccess(res));
                dispatch(popStack(next_cursor-AMOUNT_PER_FETCH))
                retryErrors();
                loadMore();
            }
            catch(error) {
                setRefetch(false)
                dispatch(fetchStatsError(error));
            }
        }
      
    },[dispatch,next_cursor,stat,refetch,retryErrors,loadMore])

    useEffect(()=>{
      if(!data || refetch) boundAction()
    },[boundAction,data,refetch])
    
    return  {data,count, setRefetch} 
}
