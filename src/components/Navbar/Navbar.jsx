import React from "react";
import "./Navbar.css";
import Fire from "../../assets/fire.png";
import Star from "../../assets/glowing-star.png";
import Party from "../../assets/partying-face.png";
import DarkMode from "../DarkMode/DarkMode";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>MovieManiac</h1>
      <div className="navbar_links">
        <DarkMode />
        <NavLink to="/">
          Popular <img src={Fire} className="navbar_emoji" alt="fire emoji" />
        </NavLink>
        <NavLink to="/top_rated">
          Top Rated <img src={Star} className="navbar_emoji" alt="star emoji" />
        </NavLink>
        <NavLink to="/upcoming">
          Upcoming{" "}
          <img src={Party} className="navbar_emoji" alt="party face emoji" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
