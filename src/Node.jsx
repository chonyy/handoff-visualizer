import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
    render() {
        let id =
            this.props.bs >= 0
                ? "bs" + this.props.bs
                : "r" + this.props.row + "c" + this.props.col;

        let visitingclass = this.props.visiting
            ? "visiting node-visited"
            : this.props.bs >= 0
            ? "bs"
            : this.props.path
            ? "path"
            : "";
        let value = this.props.visiting
            ? `${Math.sign(this.props.power) *
                  Math.round(Math.abs(this.props.power))}`
            : "";

        return (
            <div className={`node ${visitingclass}`} id={id}>
                {value}
            </div>
        );
    }
}
