import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default class BootstrapDrop extends Component {
    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle
                    size="lg"
                    variant="success"
                    id="dropdown-basic"
                >
                    Best Policy
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.handledrop(0)}>
                        Best Policy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handledrop(1)}>
                        Threshold Policy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handledrop(2)}>
                        Entrophy Policy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handledrop(3)}>
                        Minimum Policy
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
