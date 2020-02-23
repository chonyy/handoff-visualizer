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
                    <div className="legend second">MS, Car (Power)</div>
                </div>
                <div className="icon-row">
                    <div className="bs first"></div>
                    <div className="legend second">BS, Base station</div>
                </div>
                <div className="icon-row">
                    <div className="transmission first"></div>
                    <div className="legend second">Servicing</div>
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
                    <div className="legend second">Handoff Made</div>
                </div>
                <div className="icon-row">
                    <div className="entrancee first"></div>
                    <div>
                        <div className="legend second">MS Entrance</div>
                    </div>
                </div>
                <div className="third">(Cars can only enter or leave here)</div>
                <div className="icon-row">
                    <div className="enteringg first"></div>
                    <div className="legend second">Car Entering</div>
                </div>
                <div className="icon-row">
                    <div className="leavingg first"></div>
                    <div className="legend second">Car leaving</div>
                </div>
            </div>
        );
    }
}
