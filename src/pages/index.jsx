import React from 'react';
import {useFetchStats} from '@hooks/useFetchStats.hooks'

const ProductView = (props) => {
   
    //initial load
    const {data,error,pending,next_cursor,setRefetch} =  useFetchStats()
        return (
            <div>
                {error && <span>Error!!</span>}
                {pending&&<h1> Loading...</h1>} 
                {data && data.map(({ds,y})=>(
                    <>
                    <h5>
                        {`${ds} ---- $${y}`}
                    </h5>
                    </>
                ))}
                <button onClick={()=>{setRefetch(true)}} > {next_cursor} </button>
            </div>)
}

export default ProductView ;