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
        let extra = "";
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
            typename = "Average Power";
            extra = "dBm";
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
                    <div className={type}>{`${data} ${extra}`}</div>
                </div>
                <div className="plotlycontainer">
                    <Plot
                        style={{ width: "100%", height: "100%" }}
                        useResizeHandler
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
                            autosize: true,
                            title: typename,
                            showlegend: false,
                            margin: {
                                t: 30,
                                r: 20,
                                l: 45,
                                b: 20
                            },
                            useResizeHandler: true
                        }}
                        config={{ displayModeBar: false }}
                    />
                </div>
            </div>
        );
    }
}
