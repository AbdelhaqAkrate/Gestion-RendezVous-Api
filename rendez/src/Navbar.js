
import {Link} from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './styles/Navbar.css';
import React, {useState, useEffect} from 'react';
import image from "./images/image_processing20200408-10542-410lpj-removebg-preview.png";
const Navbar = () => {
  const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const closeMenu = () => {
		setOpen(false);
	};
	const logOut = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("IdUser");
		localStorage.removeItem("expire_at");
	}
    return ( 
            
        <nav className="navbar">
			<Link to="/" className="nav-logo">
				 Pretty Smile
			</Link>
			<div onClick={handleClick} className="nav-icon">
				{open ? <FiX /> : <FiMenu />}
			</div>
			<ul className={open ? 'nav-links active' : 'nav-links'}>
				<li className="nav-item">
					<Link to="/Home" className="nav-link" onClick={closeMenu}>
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/Appointment" className="nav-link" onClick={closeMenu}>
						Appointment
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/MyAppontement" className="nav-link" onClick={closeMenu}>
						My Appointment
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/" className="nav-link" onClick={closeMenu}>
						<button className='logout' onClick={logOut}>Logout</button>
					</Link>
				</li>
			</ul>
		</nav>

     );
}
 
export default Navbar;