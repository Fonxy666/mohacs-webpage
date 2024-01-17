import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerHeight, window.innerWidth]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-danger" style={ innerWidth < 1250 ? {} : {height: "5vh"}}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Főoldal</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/news">Hírek</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Boltok
                            </div>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/jumbo-poker/1">Jumbo Poker</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/ace-poker/1">Ász Poker</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/contact">
                                Elérhetőség
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
