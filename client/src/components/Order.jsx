import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames ,setOrder } from '../redux/actions'


function Order() {
    const { name, page } = useSelector(state=> state);
    const dispatch = useDispatch();

    const handleSelect = (e)=>{
        dispatch(setOrder(e.target.value))
         dispatch(getVideogames({name, page, order:e.target.value}))
     }

    return (
        <div>
            <select onChange = {handleSelect}>
                <option value="A - Z">A - Z</option>
                <option value="Z - A">Z - A</option>
                <option value="0 - 5">0 - 5</option>
                <option value="5 - 0">5 - 0</option>
            </select>
        </div>
    )
}

export default Order
