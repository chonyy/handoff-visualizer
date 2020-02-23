import React, { Component } from "react";
import "./Entrance.css";

export default class Entrance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            row: this.props.row,
            col: this.props.col,
            dir: this.props.dir,
            enter: this.props.enter
        };
    }

    componentDidMount() {
        let row = this.state.row;
        let col = this.state.col;
        let dir = this.state.dir;
        let enter = this.state.enter;
        let entrancenode = document.getElementById(`r${row}c${col}`);
        if (entrancenode !== null) {
            let result = getstyle(entrancenode, dir, enter);
            this.setState({ style: result.style, arrowimg: result.arrowimg });
        }
    }

    render() {
        let entrancestyle = this.state.style;
        let arrowimg = this.state.arrowimg;
        let entering =
            this.state.enter === 0
                ? "entering"
                : this.state.enter === 1
                ? "leaving"
                : "";
        return (
            <div
                style={entrancestyle}
                className={`${arrowimg} ${entering} arrowsize`}
            ></div>
        );
    }
}

function getstyle(node, dir, enter) {
    let offset = getOffset(node);
    var x = 0;
    var y = 0;
    var bg = "";

    if (dir === 1) {
        x = offset.left - 85;
        y = offset.top - 25;
        bg = `arrow${dir}`;
    } else if (dir === 0) {
        x = offset.left - 25;
        y = offset.top + 35;
        bg = `arrow${dir}`;
    } else if (dir === 2) {
        x = offset.left - 25;
        y = offset.top - 85;
        bg = `arrow${dir}`;
    } else if (dir === 3) {
        x = offset.left + 35;
        y = offset.top - 25;
        bg = `arrow${dir}`;
    }

    let style = {
        padding: "0px",
        margin: "0px",
        position: "absolute",
        top: y + "px",
        left: x + "px"
    };

    return {
        style: style,
        arrowimg: bg
    };
}

function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}
