import React , {useState, useEffect} from "react"
import el from './Pagination.module.css'


const Paginator = ({totalPage, maxResult,startIndex,paginate, p}) =>{
    
let countPage = Math.ceil( totalPage / maxResult );
    let pages = [];
    for( let i = 1; i <= countPage; i++){
     pages.push(i) 
    }
    let portionSize = 20

    let portionCount = Math.ceil (countPage / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div>
        {/* <div className={el.block}></div> */}
    <div className={el.number}>
        {portionNumber > 1 &&
        <button onClick = {()=>{setPortionNumber(portionNumber - 1)}}> 	&#8592;  </button> }
    
    {pages
    .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
    .map(p =>{
        return(
            <div className={el.line} key={p}> <span className = {startIndex === p && el.active  }
        onClick = { ()=> {paginate(p)} }>{p}</span>  </div>
    )})}
    {portionCount > portionNumber &&
        <button onClick = {()=>{setPortionNumber(portionNumber + 1)}}> &#8594;  </button> }
    
    </div>
</div>
}

export default Paginator