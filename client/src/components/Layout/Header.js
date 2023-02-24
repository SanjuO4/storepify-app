import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../Hooks/useCategory';
import { useCart } from '../../context/cart';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const [cart] = useCart();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        alert("Successfully Loggedout.")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <Link to='/' className='navbar-toggler-brand'>🛍️ Storepify</Link>
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to='/' className="navbar-brand">🛍️Storepify</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-cat">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contact' className="nav-link">Contact</NavLink>
                            </li>
                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to='/login' className="nav-link">Login</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ border: "none" }}>
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu dropdown-menu-user">
                                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                                                <li>
                                                    <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li>

                                    </>
                                )}
                            <li className="nav-item cart-item">
                                <NavLink to='/cart' className="nav-link">
                                    <FaShoppingCart className='cart' /> <span style={{ "color": "#c80101", "fontSize": "20px" }}>({cart?.length})</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;