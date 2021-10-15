import React from 'react'
import Card from './Card'
import {useSelector} from 'react-redux'

function Cards() {
    const { videogames} = useSelector((state) => state);

    return (
        <div>
            <div >
      {videogames?.sliced?.length > 0 &&
        videogames.sliced.map((vg) => {
          return (
            <Card
              image={vg.image}
              name={vg.name}
              genres={vg.genres}
              rating={vg.rating ? vg.rating : 0}
              key={vg.id}
              id={vg.id}
            />
          );
        })}
      </div>
        </div>
    )
}

export default Cards
