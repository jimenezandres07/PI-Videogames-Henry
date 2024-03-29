import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, postVideogame } from "../redux/actions";
import { useHistory } from "react-router";
import Style from "../css/Form.module.css";

const platforms = [
  { name: "PlayStation 5", id: 1 },
  { name: "PlayStation 4", id: 2 },
  { name: "PlayStation 3", id: 3 },
  { name: "PlayStation 2", id: 4 },
  { name: "PlayStation 1", id: 5 },
  { name: "Xbox 360", id: 6 },
  { name: "Sega", id: 7 },
];

const initialState = {
  name: "",
  description: "",
  released: "",
  rating: 0,
  image: "",
  genres: [],
  platforms: [],
};
const validate = (input) => {
  let errors = {};
  let { name, description, image, platforms, genres } = input;
  if (!name) errors.name = "El nombre es obligatorio";
  if (!description) errors.description = "La descripción es obligatoria";
  const pattern =
    /(http:|https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/;
  if (!image) errors.image = "La url de la imagen es obligatoria";
  else if (!pattern.test(image)) errors.image = "No es una url válida";
  if (genres.length < 1 || genres.length > 5)
    errors.genres = "Selecciona entre 1 y 5";
  if (platforms.length < 1 || platforms.length > 5)
    errors.platforms = "Selecciona entre 1 y 5";
  return errors;
};

function Form() {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state);
  const history = useHistory();

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState([{}]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!input.name || !input.description || !input.platforms || !input.genres){
      alert('Missing parameters')
    } else {
      dispatch(postVideogame(input));
      setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      image: "",
      platforms: [],
      genres: [],
    });
  }
  };

  const nuevoHandleInputChange = (el) => {
    const { name, value } = el.target;
    if (name === "platforms" && input.platforms !== "") {
      setInput({
        ...input,
        platforms: `${input.platforms}, ${value}`,
      });
      setErrors(
        validate({
          ...input,
          [name]: value,
        })
      );
    } else {
      setInput({
        ...input,
        platforms: value,
      });
    }
    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
  };

  const handleInputChange = (e) => {
    if (e.target.name === "genres") {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={Style.allForm}>
      <div className={Style.left}>
        <button onClick={goBack}> ⏪ </button>
      </div>
      <div className={Style.right}>
        <form onSubmit={onSubmit} className={Style.form}>
          <div className={Style.formLeft}>
            <div className={Style.inputContainer}>
              <label>Name</label>
              <input
                value={input.name}
                onChange={handleInputChange}
                name="name"
                type="text"
              />
            </div>
            <div>
              <span>{errors.name}</span>
            </div>
            <div className={Style.inputContainer}>
              <label>description</label>
              <input
                value={input.description}
                onChange={handleInputChange}
                name="description"
                type="text"
                className={Style.inputDescription}
              />
            </div>
            <div>
              <span>{errors.description}</span>
            </div>
          </div>
          <div className={Style.formLeft}>
            <div className={Style.inputContainer}>
              <label>Rating</label>
              <input
                value={input.rating}
                onChange={handleInputChange}
                name="rating"
                type="number"
              />
            </div>
            <div className={Style.inputContainer}>
              <label>released</label>
              <input
                value={input.released}
                onChange={handleInputChange}
                name="released"
                type="text"
              />
            </div>
            <div className={Style.inputContainer}>
              <label>image</label>
              <input
                value={input.image}
                onChange={handleInputChange}
                name="image"
                type="text"
              />
            </div>
            <div>
              <span>{errors.image}</span>
            </div>
            <div className={Style.inputContainer}>
              <select onChange={handleInputChange} name="genres" type="text">
                {genres.length > 0 &&
                  genres.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <span>{errors.genres}</span>
            </div>
            <div className={Style.inputContainer}>
              <select onChange={nuevoHandleInputChange} name="platforms">
                {platforms.length > 0 &&
                  platforms.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <span>{errors.platforms}</span>
            </div>
            <div>
              <input type="submit" value="Create" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}

export default Form;
