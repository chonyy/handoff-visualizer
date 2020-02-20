import React, { Component } from "react";
import "./Data.css";

let carslist = [];
let handoffslist = [];
let powerlist = [];
let cnt = 0;

export default class Data extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let type = this.props.type;
        let data = this.props.data;
        let typename = "";
        if (type === "cars") {
            typename = "Cars";
            carslist.push(data);
            plot(typename, carslist);
        } else if (type === "handoffs") {
            typename = "Handoffs";
            handoffslist.push(data);
            plot(typename, handoffslist);
        } else if (type === "power") {
            typename = "Avg. Power";
            data = data.toFixed(2);
            powerlist.push(data);
            plot(typename, powerlist);
        }
        return (
            <div className="data">
                <div className="word">{typename}</div>
                <div className={type}>{data}</div>
            </div>
        );
    }
}

function plot(type, list) {
    let title = "";

    if (type === "Cars") title = "Number of Cars";
    else if (type === "Handoffs") title = "Number of Handoffs";
    else if (type === "Avg. Power") {
        title = "Average Power";
        type = "Power";
    }
    window.Plotly.newPlot(
        type,
        [
            {
                y: list,
                type: "line"
            }
        ],
        {
            title: title,
            margin: {
                t: 30,
                r: 20,
                l: 20,
                b: 20
            }
        }
    );

    if (type === "Power") {
        cnt++;
        if (cnt > 12) {
            window.Plotly.relayout(type, {
                xaxis: {
                    range: [cnt - 10, cnt]
                }
            });
        }
    }
}
