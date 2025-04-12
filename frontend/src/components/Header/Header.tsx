import { useState } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigate = (path) => {
        navigate(path);
        if (window.innerWidth <= 768) {
            setIsMenuOpen(false);
        }
    }

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="nav-links">
                    <button 
                        onClick={() => handleNavigate("usuarios")} 
                        className={isActive("/usuarios") || isActive("/") ? "selected" : ""}
                    >
                        <span className="icon">
                            <FaUserAstronaut className="navicon" size={25}/>
                            Usuarios
                        </span>
                    </button>
                    <button 
                        onClick={() => handleNavigate("productos")} 
                        className={isActive("/productos") ? "selected" : ""}
                    >
                        <span className="icon">
                            <FaClipboardList className="navicon" size={25}/>
                            Productos
                        </span>
                    </button>
                </div>
            </div>
            <div className="navbar-right">
                <div className="hamburger-icon" onClick={handleMenuToggle}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>

            {/* Menu de navegación que se muestra en pantallas pequeñas */}
            {isMenuOpen && (
                <div className="mobile-nav">
                    <button onClick={() => handleNavigate("usuarios")} className={isActive("/usuarios") ? "selected" : ""}>
                        Usuarios
                    </button>
                    <button onClick={() => handleNavigate("productos")} className={isActive("/productos") ? "selected" : ""}>
                        Productos
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;