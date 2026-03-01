import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1 className="nav-title">📇 Person Directory</h1>
                <ul className="nav-menu">
                    <li>
                        <Link to="/" className={`nav-link ${isActive('/')}`}>
                            View Directory
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin" className={`nav-link admin-btn`}>
                            🔐 Admin Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;