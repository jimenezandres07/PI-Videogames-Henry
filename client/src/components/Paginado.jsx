import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, setPage, resetPage } from "../redux/actions";

function Paginado() {
    const dispatch = useDispatch();
  const { videogames, order, page, name } = useSelector((state) => state);

  const resetTPage = () => {
    dispatch(resetPage());
    dispatch(getVideogames({}));
  };

  const changePage = (page) => {
    dispatch(setPage(page));
    dispatch(getVideogames({ page, order, name }));
  };
    return (
        <div>
            <span>
        <button
          disabled={page - 1 === 0}
          onClick={() => {
            changePage(page - 1);
          }}
        >
          previous
        </button>

        <label>{page}</label>
        <button
          disabled={videogames?.count <= page * 15}
          onClick={() => {
            changePage(page + 1);
          }}
        >
          next
        </button>
        <button onClick={resetTPage}> Delete Filters! </button>
      </span>
        </div>
    )
}

export default Paginado
