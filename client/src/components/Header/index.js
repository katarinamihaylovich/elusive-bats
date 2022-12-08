import { Link } from 'react-router-dom';
import React from 'react';
import Auth from '../../utils/auth';

function Header () {
	return (
		<nav>
			<Link to="/">Home</Link>
			
			<Link to="/about">About</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/login">Login</Link>
		</nav>
	);	
}

export default Header;