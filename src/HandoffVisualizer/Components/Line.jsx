import React, { Component } from "react";

export default class Line extends Component {
    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            col: this.props.col,
            basestaion: this.props.bs
        };
    }

    componentDidMount() {
        let row = this.state.row;
        let col = this.state.col;
        let basestaion = this.state.basestaion;
        let movingnode = document.getElementById(`r${row}c${col}`);
        let bs = document.getElementById(`bs${basestaion}`);
        let linestyle = {};
        if (movingnode !== null && bs !== null) {
            linestyle = connect(bs, movingnode, "#ffc952", 5);
            this.setState({ linestyle: linestyle });
        }
    }

    render() {
        let row = this.props.row;
        let col = this.props.col;
        let basestaion = this.props.bs;
        let handoff = this.props.handoff;
        let linestyle = this.state.linestyle;
        let handoffstyle = {};
        let movingnode = document.getElementById(`r${row}c${col}`);
        let bs = document.getElementById(`bs${basestaion}`);
        if (movingnode !== null && bs !== null) {
            linestyle = connect(bs, movingnode, "#ffc952", 5);
        }
        if (handoff && movingnode !== null) {
            handoffstyle = drawhandoff(movingnode);
        } else {
            handoffstyle = { display: "none" };
        }

        return (
            <>
                <div style={handoffstyle} className={"handoff"}></div>
                <div style={linestyle}></div>
            </>
        );
    }
}

function drawhandoff(node) {
    var nodeOff = getOffset(node);
    var x = nodeOff.left - 0.7 * nodeOff.width;
    var y = nodeOff.top - 90;
    let handoffstyle = {
        padding: "0px",
        margin: "0px",
        width: "80px",
        height: "80px",
        position: "absolute",
        top: y + "px",
        left: x + "px"
    };
    return handoffstyle;
}

function connect(div1, div2, color, thickness) {
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    // bottom right
    var x1 = off1.left + 0.5 * off1.width;
    var y1 = off1.top + 0.5 * off1.height;
    // top right
    var x2 = off2.left + 0.5 * off2.width;
    var y2 = off2.top + 0.5 * off2.height;
    // distance
    var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    // center
    var cx = (x1 + x2) / 2 - length / 2;
    var cy = (y1 + y2) / 2 - thickness / 2;
    // angle
    var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
    // make hr

    let linestyle = {
        padding: "0px",
        margin: "0px",
        height: thickness + "px",
        backgroundColor: color,
        lineHeight: "1px",
        position: "absolute",
        left: cx + "px",
        top: cy + "px",
        width: length + "px",
        transform: "rotate(" + angle + "deg)",
        opacity: 0.5
    };

    return linestyle;
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
