import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AiFillShop } from "react-icons/ai";
import '../App.css';

const Links = () => {
  const location = useLocation(); // Get the current location
  const [userData, setUserData] = useState(null);
  //export 'useHistory' (imported as 'useHistory') was not found in 'react-router-dom'


  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const userData = sessionStorage.getItem('userData');
      //how to get current path 
      const currentPath = location.pathname;
      // If currentPath contains login or signup
      if (currentPath.includes('/login') || currentPath.includes('/signup')|| currentPath.includes('/test')) {
        return; // Do nothing if the current path contains login or signup
      }
      if (!userData) {
        navigate('/login'); // Redirect to login page
      }
    };

    checkSession(); // Initial check when the component mounts


  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      getData();

    }, 200)



  }, [location]);



  const getData = async () => {
    console.log("userData" + sessionStorage.getItem('userData'))
    const data = sessionStorage.getItem('userData');
    console.log('useeffct run');

    setUserData(data);

  }

  const logout = () => {
    sessionStorage.clear();
    setUserData("");
    navigate('/');

  }
  return (
    //in small screen, these are not properly aligned, how to make it responsive

    //i want to sepearte maa Kirana span  to first row and remaining on second row for view
    //update background color to 
    <nav className="navbar1">
      
      <ul className="navbar-links">
        
        {userData ? (
          <>
            <li>
              <Link to="/Purchaser" className={location.pathname === '/Purchaser' ? 'active' : ''}>Purchaser</Link>
            </li>
            <li>
              <Link to="/Inventory" className={location.pathname === '/Inventory' ? 'active' : ''}>Inventory</Link>
            </li>
            <li>
              <Link to="/Cart" className={location.pathname === '/Cart' ? 'active' : ''}>Cart</Link>
            </li>
            <li>
              <Link to="/Order" className={location.pathname === '/Order' ? 'active' : ''}>Order</Link>

            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Links;