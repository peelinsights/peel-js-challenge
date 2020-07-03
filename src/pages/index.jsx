import React from 'react';
import {useFetchStats} from '@hooks/useFetchStats.hooks'
import statsService from '@services/stats.services'
import {INITIAL_STATS_AMOUNT,AMOUNT_PER_FETCH} from '@constants/'
import { pushStackSuccess,pushStackError} from '@actions';
import {wrapper} from '@store';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import createCounter from '@util/createCounter.util'



const StatsView = (props) => {
   
    //initial load
    const {data,count,setRefetch} =  useFetchStats()
    const isItemLoaded = index => !!data[index];
    const Row =  ({ index, style }) => {
    
        const actualStat = data[index]
        const {ds,y} = actualStat
        return (
          <div className="ListItem" style={style} >
           <div style={{
              height: "30px",
              display:'flex' , 
              width:'100%',
              lineHeight: '30px',
              justifyContent: 'space-around'
              }}>
                  {actualStat? ( <>
                    <h5 style={{color:'purple'}}>{index}</h5>
                    <h5 style={{color:'blue'}}>{ds}</h5>
                    <h5 style={{color:'green'}}>{`$${y}`}</h5>
                  </>):<h5 style={{color:'red'}}>{`Loading...`}</h5>}

           
          </div>
          </div>
        );
      }
        return (
            <div>
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={10000}
                    loadMoreItems={()=>{setRefetch(true)}}
                >
                    {({ onItemsRendered, ref }) => (
                    <List
                        className="List"
                        height={150}
                        itemCount={count}
                        itemSize={50}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        width={300}
                    >
                        {Row}
                    </List>
                    )}
                </InfiniteLoader>
            </div>)
}



  export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    const cursors = createCounter(AMOUNT_PER_FETCH,INITIAL_STATS_AMOUNT)
    console.log('cursors',INITIAL_STATS_AMOUNT,AMOUNT_PER_FETCH,cursors)
    await Promise.all(
        cursors.map(async (actualCursor)=>{
            try{
                const res = await statsService(actualCursor)
                if(res.error) {
                    throw(res.error);
                }
                store.dispatch(pushStackSuccess({actual_cursor:actualCursor,res:res}));
            }
            catch(error) {
                const errorCode =  (error.response && error.response.status) || 500
                const errorObj = {actual_cursor:actualCursor,errorMsg:errorCode}
                store.dispatch(pushStackError(errorObj))
            }
        })
    )
    
   
  })

export default StatsView ;