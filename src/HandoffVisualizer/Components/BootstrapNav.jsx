import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./BootstrapNav.css";

export default class BootstrapNav extends Component {
    render() {
        return (
            <div>
                <Navbar
                    bg="dark"
                    expand="md"
                    variant="dark"
                    fixed="top"
                    className="navbrand"
                >
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="./bs.png"
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                            id="logo"
                        />{" "}
                        Wireless Network Handoff Visualizer
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link
                                href="https://github.com/chonyy/handoff-visualizer/blob/master/README.md"
                                className="navbarlinks"
                            >
                                Docs
                            </Nav.Link>
                            <Nav.Link
                                href="https://github.com/chonyy/handoff-visualizer"
                                className="navbarlinks"
                            >
                                Source
                            </Nav.Link>
                            <Nav.Link
                                href="https://github.com/chonyy"
                                className="navbarlinks"
                            >
                                Creator
                            </Nav.Link>
                            <Nav.Link
                                href="https://github.com/chonyy/handoff-simulator"
                                className="navbarlinks"
                            >
                                Simulation
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
