import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import logo from "../assets/logo.png";
import "../styles/navbar.css";


function Navbar({isSidePanelOpen, setIsSidePanelOpen, isLoggedIn, setIsLoggedIn}) {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      handleLoginChange(false);
      navigate("/login");
    }
    else {
      navigate("/login");
    }
  };

  const handleSidepanelChange = useCallback(event => {
    setIsSidePanelOpen(event)
  }, [setIsSidePanelOpen])

  const handleLoginChange = useCallback(event => {
    setIsLoggedIn(event)
  }, [setIsLoggedIn])

  return (
    <nav>
      <div className="navSidepanelNLogo">
        <button className="navSidepanel" onClick={() => handleSidepanelChange(!isSidePanelOpen)}>
          <HiOutlineMenuAlt2/>
        </button>

        <Link to="/" className="navLogo">
          <img src={logo} alt="HealthBox logo" width="40" height="40" />
          <span className="hideOnMobile"> HealthBox </span>
        </Link>
      </div>

      <button className="navCerrarSesion" onClick={handleLogin}>
        <span className="hideOnMobile">{isLoggedIn ? 'Cerrar sesión':'Iniciar sesión'} &nbsp;</span>
        <RiLogoutCircleRLine/>
      </button>
    </nav>
  );
}

export default Navbar;
