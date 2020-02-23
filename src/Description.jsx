import React, { Component } from "react";
import BootstrapDrop from "./BootstrapDrop";
import Icons from "./Icons";

export default class Description extends Component {
    render() {
        return (
            <div className="descontainer">
                <div className="description">
                    <div className="goalcontainer">
                        <div className="intro goal">Goal</div>
                        <div className="intro intropower">Least Handoffs</div>
                        <div className="intro introhandoffs">Highest Power</div>
                    </div>
                    <BootstrapDrop></BootstrapDrop>
                    <div className="button" onClick={() => this.handleClick()}>
                        <div>Visualize</div>
                    </div>
                    <Icons></Icons>
                </div>
            </div>
        );
    }
}
