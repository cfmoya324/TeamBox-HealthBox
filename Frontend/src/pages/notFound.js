import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="notFound">
            <h1 className="notFoundTitle">Uh-Oh...</h1>
            <h1 className="notFoundSubtitle">No logramos encontrar la página que estás buscando.</h1>
            <h2 className="notFoundSubtitle">(404: PÁGINA NO ENCONTRADA.)</h2>
            <button className="notFoundButton" onClick={() => navigate("/")}>Regresar al inicio</button>
        </div>
    );
}

export default NotFound;
