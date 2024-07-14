import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://api-book-tracker.vercel.app/books"
        );
        setBooks(response.data);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api-book-tracker.vercel.app/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      {error && <p>Algo deu errado ao buscar os livros!</p>}
      <div className="books">
        {books.map((book) => (
          <div key={book._id} className="book">
            <img src={book.cover} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span style={{ fontWeight: "bold" }}>{book.price}R$</span>
            <div className="button-container">
              <button onClick={() => handleDelete(book._id)} className="delete">
                Deletar
              </button>
              <Link to={`/update/${book._id}`} className="update">
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add" className="addButton">
        Adicionar Novo Livro
      </Link>
    </div>
  );
};

export default Books;
