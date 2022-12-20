import { Link } from 'react-router-dom';
import React from 'react';
import Auth from '../../utils/auth';

function Header () {
	const logout = event => {
		event.preventDefault();
		Auth.logout();
	};

	return (
		<nav>
			<Link to="/">Home</Link>
			
			<Link to="/about">About</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/login">Login</Link>
			<a href="/" onClick={logout}>Logout</a>
		</nav>
	);	
}

export default Header;