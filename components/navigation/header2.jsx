"use client";

import "./nav.css";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Header({ navigation }) {
  return (
    <Navbar>
      <NavItem icon="fa-solid fa-plus" />
      <NavItem icon="fa-solid fa-bell" />
      <NavItem icon="fa-brands fa-facebook-messenger" />

      <NavItem icon="fa-solid fa-caret-down">
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}


function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        <i className={props.icon}></i>
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 35);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 35;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">
          <i className={props.leftIcon}></i>
        </span>
        {props.children}
        <span className="icon-right">
          <i className={props.rightIcon}></i>
        </span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon="fa-solid fa-gear"
            rightIcon="fa-solid fa-chevron-right"
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon="fa-solid fa-chevron-right"
            goToMenu="animals"
          >
            Animals
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon="fa-solid fa-arrow-left">
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon="fa-solid fa-bolt">HTML</DropdownItem>
          <DropdownItem leftIcon="fa-solid fa-bolt">CSS</DropdownItem>
          <DropdownItem leftIcon="fa-solid fa-bolt">JavaScript</DropdownItem>
          <DropdownItem leftIcon="fa-solid fa-bolt">Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon="fa-solid fa-arrow-left">
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
