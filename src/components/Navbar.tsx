import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { NavPages } from "../pages.ts";

export function Navbar(/* {isLightMode, setIsLightMode}: any */) {

  /* const handleToggle = () => {
    setIsLightMode(!isLightMode);
  }; */

  const pages = NavPages.map((item, pageIndex) => {
    if ("folder" in item && item.folder) {
      const folderItems = item.folder.map((subpage, subpageIndex) => {
        if (subpage.path) {
          return (
            <NavDropdown.Item
              key={`subpage-${pageIndex}-${subpageIndex}`}
              as={Link}
              to={subpage.path}
            >
              {subpage.name}
            </NavDropdown.Item>
          );
        }
        return null; // Ensure a value is returned even if subpage.path is not defined
      });

      return (
        <NavDropdown
          key={`page-${pageIndex}`}
          title={item.name}
          renderMenuOnMount={true}
          id="basic-nav-dropdown"
        >
          {folderItems.length > 0 ? folderItems : <NavDropdown.Item disabled>No items</NavDropdown.Item>}
        </NavDropdown>
      );
    } else if ("path" in item && item.path) {
      return (
        <Nav.Link key={`page-${pageIndex}`} as={Link} to={item.path}>
          {item.name}
        </Nav.Link>
      );
    }
    return null; // Ensure a value is returned if neither condition matches
  });

  return (
    <BootstrapNavbar className="navbar-custom" expand="lg" bg="bg-transparent" variant="light" /* bg={isLightMode ? "d" : "l"} variant={isLightMode ? "dark" : "light"} */ fixed="top">
      <Container>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav"/>
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="left-aligned">
            {/* <button id="theme-toggle" className="btn btn-outline-secondary ml-auto" onClick={handleToggle}>        
              {isLightMode ? '🌙' : '🔆' }
            </button> */}
            {pages}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
