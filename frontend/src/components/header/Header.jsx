import React, { useRef, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import "./header.scss";
import { OutlineButton } from "../button/Button";
import { useAuth } from "../../authContext/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "My Movies",
    path: "/my-movie",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const { isLoggedIn, login, logout } = useAuth();
  const active = headerNav.findIndex((e) => e.path === pathname);

  const navigate = useNavigate();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleSignOut = async ( ) => {
    await axios.get('http://localhost:3000/logout',{ withCredentials: true })
    logout
  }

  const handleSignIn = async ( ) => {
navigate('/login')    
logout
  }



  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">Moviez</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
          {isLoggedIn ? (
            <OutlineButton onClick={handleSignOut}>Sign Out</OutlineButton>
          ) : (
            <OutlineButton onClick={handleSignIn}>Sign In</OutlineButton>
          )}{" "}
        </ul>
      </div>
    </div>
  );
};

export default Header;
