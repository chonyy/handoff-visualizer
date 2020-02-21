import React, { Component } from "react";
import "./Icons.css";

export default class Icons extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="icons-description">
                <div className="icon-row">
                    <div className="ms first">-103</div>
                    <div className="legend second">MS (Car)</div>
                </div>
                <div className="icon-row">
                    <div className="bs first"></div>
                    <div className="legend second">BS (Base station)</div>
                </div>
                <div className="icon-row">
                    <div className="path first"></div>
                    <div className="legend second">MS Path</div>
                </div>
                <div className="icon-row">
                    <div className="block first"></div>
                    <div className="legend second">Block</div>
                </div>
                <div className="icon-row">
                    <div className="handoff first"></div>
                    <div className="legend second">Handoff</div>
                </div>
                <div className="icon-row">
                    <div className="transmission first"></div>
                    <div className="legend second">Transmission Path</div>
                </div>
            </div>
        );
    }
}

/* black arrow
green arrow
red arrow

connection line

make img with ppt */
