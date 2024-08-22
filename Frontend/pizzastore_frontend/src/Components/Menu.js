import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Menu() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token in local storage
        localStorage.setItem('username', ' '); 
        alert('Logged out successfully');  // Show alert
        console.log('Logged out successfully'); //show message in console
        navigate('/login');  // Navigate to login page
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Pizza Store</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleLogout}
                    style={{ marginLeft: '10px' }}
                >
                    Logout
                </button>
            </nav>
        </>
    );
}

export default Menu;
