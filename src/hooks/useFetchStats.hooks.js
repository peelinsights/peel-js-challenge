
// fetchStats.js
import  { useState, useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStatsPending, fetchStatsSuccess, fetchStatsError} from '@actions';
import statsService from '@services/stats.services'

 export function useFetchStats () {
    const [refetch,setRefetch] = useState(false)
    const dispatch = useDispatch();
    const {data, pending, error,next_cursor} = useSelector(state=>state.stats,stats=>stats.data.lenght)
    console.log(data, pending, error)
    const  boundAction =  useCallback(async ()=>{
        fetchStatsPending()
        try{
            const res = await statsService(next_cursor)
            if(res.error) {
                throw(res.error);
            }
            setRefetch(false)
            dispatch(fetchStatsSuccess(res));
        }
        catch(error) {
            console.log(error)
            setRefetch(false)
            dispatch(fetchStatsError(error));
        }
    },[dispatch,next_cursor])

    useEffect(()=>{
        console.log(refetch)
       if(!data || refetch) boundAction()
    },[boundAction,data,refetch])
    
    return  {data, pending, error,next_cursor,setRefetch} 
}
