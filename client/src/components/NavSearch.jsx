import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames, setName,setPage} from '../redux/actions/index'
import Styles from '../css/NavSearch.module.css';

function NavSearch() {
    const [input, setInput] = useState("")

    const dispatch = useDispatch()

    const handleOnChange = (e)=>{
        e.preventDefault()
        setInput(e.target.value)
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(setName(input))//guardamos en store el name
        dispatch(setPage(1))
        dispatch(getVideogames({name:input})) // buscamos efectivamente
        setInput("")
    }



    return (
        <div className={Styles.allSearch}>
            <form onSubmit={onSubmit}>
            <input type="text" placeholder="Search..." onChange={handleOnChange} value={input} className={Styles.form} />
            <button type="submit" className={Styles.button}>🔍</button>
            </form>
        </div>
    )
}

export default NavSearch
