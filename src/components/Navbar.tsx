import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://client-mern-auth.netlify.app"
                       target="_blank" rel="noopener noreferrer"
                    >ClientApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${activeLink === "/" ? "active" : ""}`} href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeLink === "/users" ? "active" : ""}`} href="/users">
                                    Users
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeLink === "/comments" ? "active" : ""}`}
                                   href="/comments">
                                    Comments
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeLink === "/companies" ? "active" : ""}`}
                                   href="/companies">
                                    Companies
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
