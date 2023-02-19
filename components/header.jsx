"use client";

import "./nav.css";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";

export default function Header({ navigation }) {
  return (
    <Navbar>
      <NavItem icon="fa-solid fa-plus" />
      <NavItem icon="fa-solid fa-bell" />
      <NavItem icon="fa-brands fa-facebook-messenger" />

      <NavItem icon="fa-solid fa-caret-down">
        <DropdownMenu navigation={navigation}></DropdownMenu>
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
  const dropdownRef = useRef(null);
  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(dropdownRef.current) &&
        event.target !== dropdownRef.current
      ) {
        setOpen(false);
        console.log(
          `You clicked Outside the box at ${new Date().toLocaleString()}`
        );
      } else {
        console.log(
          `You clicked Inside the box at ${new Date().toLocaleString()}`
        );
      }
    };
  }, []);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        <i className={props.icon}></i>
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu({ navigation }) {
  const [categories, setCategories] = useState(navigation.categories);
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(dropdownRef.current) &&
        event.target !== dropdownRef.current
      ) {
        console.log(
          `You clicked Outside the box at ${new Date().toLocaleString()}`
        );
      } else {
        console.log(
          `You clicked Inside the box at ${new Date().toLocaleString()}`
        );
      }
    };
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 35);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 35;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return props.category ? (
      <Link
        href={`/category/${props.category}/${props.subcategory}`}
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
      </Link>
    ) : (
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
          <DropdownItem leftIcon="fa-duotone fa-grid-2">
            <Link href="/category/all">All Categories</Link>
          </DropdownItem>
          {categories.map((category) => (
            <DropdownItem
              leftIcon="fa-solid fa-bolt"
              rightIcon="fa-solid fa-chevron-right"
              goToMenu={category.name}
            >
              {category.name}
            </DropdownItem>
          ))}
        </div>
      </CSSTransition>

      {categories.map((category) => (
        <CSSTransition
          in={activeMenu === `${category.name}`}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon="fa-solid fa-arrow-left">
              <h2>{category.name}</h2>
            </DropdownItem>
            <DropdownItem
              leftIcon="fa-solid fa-bolt"
              category={category.slug}
              subcategory={""}
            >
              All {category.name}
            </DropdownItem>
            {category.sub_categories.map((subcategory) => (
              <DropdownItem
                leftIcon="fa-duotone fa-bolt"
                category={category.slug}
                subcategory={subcategory.slug}
              >
                {subcategory.name}
              </DropdownItem>
            ))}
          </div>
        </CSSTransition>
      ))}
    </div>
  );
}

function listenForOutsideClicks(listening, setListening, menuRef, setIsOpen) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef.current;
        const node = evt.target;
        if (cur.contains(node)) return;
        setIsOpen(false);
      });
    });
  };
}
