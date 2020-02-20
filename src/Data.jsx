import React, { Component } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js/dist/plotly-cartesian";
import "./Data.css";

const Plot = createPlotlyComponent(Plotly);
let carslist = [];
let handoffslist = [];
let powerlist = [];
let carcntlist = [];
let handcntlist = [];
let powercntlist = [];
let carcnt = 0;
let handcnt = 0;
let powercnt = 0;
let init = 0;

export default class Data extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let type = this.props.type;
        let data = this.props.data;
        let typename = "";
        let xlist = [];
        let list = [];
        if (type === "cars") {
            typename = "Cars";
            carslist.push(data);
            carcntlist.push(carcnt);
            carcnt++;
            xlist = carcntlist;
            list = carslist;
            init = 4;
        } else if (type === "handoffs") {
            typename = "Handoffs";
            handoffslist.push(data);
            handcntlist.push(handcnt);
            handcnt++;
            xlist = handcntlist;
            list = handoffslist;
            init = 0;
        } else if (type === "power") {
            typename = "Avg. Power";
            data = data.toFixed(2);
            powerlist.push(data);
            powercntlist.push(powercnt);
            powercnt++;
            xlist = powercntlist;
            list = powerlist;
            init = -103;
        }
        // console.log(xlist, list);
        return (
            <div className="datacontainer">
                <div className="data">
                    <div className="word">{typename}</div>
                    <div className={type}>{data}</div>
                </div>
                <Plot
                    data={[
                        {
                            x: xlist,
                            y: list,
                            type: "line",
                            marker: { color: "#be3335" }
                        },
                        { type: "line", x: [0], y: [init] }
                    ]}
                    layout={{
                        width: 350,
                        height: 150,
                        title: typename,
                        showlegend: false,
                        margin: {
                            t: 30,
                            r: 20,
                            l: 45,
                            b: 20
                        }
                    }}
                />
            </div>
        );
    }
}

// function plot(type, list) {
//     let title = "";

//     if (type === "Cars") title = "Number of Cars";
//     else if (type === "Handoffs") title = "Number of Handoffs";
//     else if (type === "Avg. Power") {
//         title = "Average Power";
//         type = "Power";
//     }
//     window.Plotly.newPlot(
//         type,
//         [
//             {
//                 y: list,
//                 type: "line"
//             }
//         ],
//         {
//             title: title,
//             margin: {
//                 t: 30,
//                 r: 20,
//                 l: 45,
//                 b: 20
//             }
//         }
//     );

//     if (type === "Power") {
//         cnt++;
//         if (cnt > 12) {
//             window.Plotly.relayout(type, {
//                 xaxis: {
//                     range: [cnt - 10, cnt]
//                 }
//             });
//         }
//     }
// }
