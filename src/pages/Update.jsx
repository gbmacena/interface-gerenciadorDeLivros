import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://api-book-tracker.vercel.app/books/${id}`
        );
        setBook(response.data);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://api-book-tracker.vercel.app/books/${id}`,
        book
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Atualizar Livro</h1>
      <input
        type="text"
        placeholder="Título"
        name="title"
        onChange={handleChange}
        value={book.title}
      />
      <textarea
        rows={5}
        placeholder="Descrição"
        name="desc"
        onChange={handleChange}
        value={book.desc}
        maxLength={800}
        style={{ maxWidth: "100%" }}
      />
      <input
        type="number"
        placeholder="Preço"
        name="price"
        onChange={handleChange}
        value={book.price}
      />
      <input
        type="text"
        placeholder="Capa"
        name="cover"
        onChange={handleChange}
        value={book.cover}
      />
      <button className="formButton" onClick={handleClick}>
        Atualizar
      </button>
      {error && <p className="error-message">Algo deu errado!</p>}
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

export default Update;
