import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default class BootstrapDrop extends Component {
    handledrop(clicked) {
        let policyobj = this.props.policyobj;
        if (clicked === 0) {
            document.getElementById("dropdown-basic").innerHTML = "Best Policy";
            policyobj.policy = 0;
        } else if (clicked === 1) {
            document.getElementById("dropdown-basic").innerHTML =
                "Threshsold Policy";
            policyobj.policy = 1;
        } else if (clicked === 2) {
            document.getElementById("dropdown-basic").innerHTML =
                "Entrophy Policy";
            policyobj.policy = 2;
        } else if (clicked === 3) {
            document.getElementById("dropdown-basic").innerHTML =
                "Minimum Policy";
            policyobj.policy = 3;
        }
    }

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
