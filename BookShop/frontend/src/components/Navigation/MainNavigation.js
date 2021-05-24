import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import AdminProfilePage from "../../pages/AdminProfile";

function MainNavigation() {
  const { user, logout } = useContext(AuthContext);
  
  // When we want to go to another page, navbarItem will be active
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'Home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const MainNavigation =
    user && user.username === "admin" ? (
      <Menu
        pointing
        secondary
        size="massive"
        color="teal"
        className="MainNavigation"
      >
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right" size="massive" color="teal">
          <Menu.Item
            name={user.username}
            active={activeItem === user.username || activeItem === "adminProfile"}
            onClick={handleItemClick}
            as={Link}
            to="/adminProfile"
          />

          <Menu.Item name="Logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    ) : user && user.username !== "admin" ? (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right" size="massive" color="teal">
          <Menu.Item
            name={user.username}
            active={activeItem === user.username || activeItem === "profile"}
            onClick={handleItemClick}
            as={Link}
            to="/profile"
          />
          <Menu.Item name="Logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    ) : (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    );

  return MainNavigation;
}

export default MainNavigation;
