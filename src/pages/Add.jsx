import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!book.title || !book.desc || book.price === null) {
      setError(true);
      setErrorMessage("Preencha todos os campos!");
      return;
    }

    try {
      await axios.post("https://api-book-tracker.vercel.app/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Algo deu errado!");
    }
  };

  return (
    <div className="form">
      <h1>Adicionar novo livro</h1>
      <input
        type="text"
        placeholder="Título"
        onChange={handleChange}
        name="title"
      />
      <textarea
        rows={5}
        placeholder="Descrição do livro"
        name="desc"
        onChange={handleChange}
        maxLength={1000}
        style={{ maxWidth: "100%" }}
      />
      <input
        type="number"
        placeholder="Preço"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="Capa"
        onChange={handleChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>
        Adicionar
      </button>
      {error && <p className="error-message">{errorMessage}</p>}
      <Link
        className="formButton"
        style={{ textDecoration: "none", color: "white" }}
        to="/"
      >
        Voltar
      </Link>
    </div>
  );
};

export default Add;
