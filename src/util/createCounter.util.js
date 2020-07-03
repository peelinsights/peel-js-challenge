export default (delimiter,end,start=0) => {
   let plainArray =  Array(end - start + 1).fill().map((_, idx) => start + idx)
   console.log('plainArray',plainArray)
   let filterArray = plainArray.filter((element,index)=>element%delimiter===0)
   return filterArray
}
