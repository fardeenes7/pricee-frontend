"use client";

import "./nav.css";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";

export default function Header({ navigation }) {
  const [open, setOpen] = useState(0);
  const dropdownRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(dropdownRef.current) &&
        event.target !== dropdownRef.current
      ) {
        setOpen(0);
      }
    };
  }, []);
  return (
    <div className="sticky top-0 z-50 w-full bg-slate-100 px-4 shadow-lg">
      <nav className="navbar mx-6 flex max-w-7xl items-center justify-between py-4 sm:items-center lg:mx-auto">
        <div className="block lg:hidden">
          <button>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/" className="text-2xl font-bold">
            pricee
          </Link>
          <div className="mx-6 hidden items-center gap-6 lg:flex">
            <ul className="navbar-nav ">
              <NavItem
                open={open}
                changeopen={() => (open === 1 ? setOpen(0) : setOpen(1))}
                changeeclose={() => setOpen(0)}
                icon="fa-solid fa-caret-down"
                name="Categories"
              >
                <DropdownMenu
                  dropdownRef={dropdownRef}
                  changeopen={() => (open === 1 ? setOpen(0) : setOpen(1))}
                  navigation={navigation}
                ></DropdownMenu>
              </NavItem>
            </ul>
            {navigation.shops.map((shop, id) => (
              <Link href={`/shop/${shop.name}`} className="text-sm" key={id}>
                {shop.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <ul className="navbar-nav">
            {loggedIn ? (
              <NavItem2
                open={open}
                changeopen={() => (open === 2 ? setOpen(0) : setOpen(2))}
                changeeclose={() => setOpen(0)}
                icon="fa-solid fa-caret-down"
                name="Login"
              >
                <DropdownMenu2
                  dropdownRef={dropdownRef}
                  changeopen={() => (open === 2 ? setOpen(0) : setOpen(2))}
                  navigation={navigation}
                ></DropdownMenu2>
              </NavItem2>
            ) : (
              <button className="rounded-md bg-accent-1 px-4 py-2 text-sm font-semibold text-secondary hover:bg-accent-2">
                Login
              </button>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

function Navbar(props) {
  return <div>Hello</div>;
}

function NavItem({ open, changeopen, ...props }) {
  return (
    <button className="nav-item w-full rounded-lg border-2 border-accent-1 font-medium">
      <a className="px-4 py-1" onClick={changeopen}>
        <span className="font mr-2 text-sm">{props.name}</span>
        <i className={props.icon}></i>
      </a>

      {open === 1 && props.children}
    </button>
  );
}

function NavItem2({ open, changeopen, ...props }) {
  return (
    <li className="nav-item w-full rounded-lg border-2 border-accent-1 font-medium">
      <a href="#" className="px-4 py-1" onClick={changeopen}>
        <span className="font mr-2 text-sm">{props.name}</span>
        <i className={props.icon}></i>
      </a>

      {open === 2 && props.children}
    </li>
  );
}

function DropdownMenu({ changeopen, navigation, dropdownRef }) {
  const [categories, setCategories] = useState(navigation.categories);
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 20);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 20;
    setMenuHeight(height);
  }

  function DropdownItem({ changeopenstate, ...props }) {
    return props.category ? (
      <Link
        href={`/category/${props.category}/${props.subcategory}`}
        className="menu-item"
        onClick={changeopenstate}
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
    <div
      className="dropdown translate-x-[45%]"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
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
              goToMenu={category.slug}
            >
              {category.name}
            </DropdownItem>
          ))}
        </div>
      </CSSTransition>

      {categories.map((category) => (
        <CSSTransition
          in={activeMenu === `${category.slug}`}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon="fa-solid fa-arrow-left">
              <h2>Go Back</h2>
            </DropdownItem>
            <DropdownItem
              leftIcon="fa-solid fa-bolt"
              category={category.slug}
              subcategory={""}
              changeopenstate={changeopen}
            >
              All {category.name}
            </DropdownItem>
            {category.sub_categories.map((subcategory, id) => (
              <DropdownItem
                leftIcon="fa-duotone fa-bolt"
                category={category.slug}
                subcategory={subcategory.slug}
                changeopenstate={changeopen}
                key={id}
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

function DropdownMenu2({ changeopen, navigation, dropdownRef }) {
  const [categories, setCategories] = useState(navigation.categories);
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 20);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 20;
    setMenuHeight(height);
  }

  function DropdownItem({ changeopenstate, ...props }) {
    return props.category ? (
      <Link
        href={`/category/${props.category}/${props.subcategory}`}
        className="menu-item"
        onClick={changeopenstate}
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
    <div
      className="dropdown -translate-x-[45%]"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
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
              changeopenstate={changeopen}
            >
              All {category.name}
            </DropdownItem>
            {category.sub_categories.map((subcategory) => (
              <DropdownItem
                leftIcon="fa-duotone fa-bolt"
                category={category.slug}
                subcategory={subcategory.slug}
                changeopenstate={changeopen}
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
