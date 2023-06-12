import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="">
              BonE: Brownout on Edge
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">
              Documentation
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} . Made by{" "}
          <a>
            Cloud Genesis
          </a>{" "}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
