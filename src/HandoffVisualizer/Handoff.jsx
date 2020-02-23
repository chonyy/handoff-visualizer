import React, { Component } from "react";
import BootstrapNav from "./Components/BootstrapNav";
import "./Handoff.css";
import BootstrapDrop from "./Components/BootstrapDrop";
import Icons from "./Components/Icons";
import Simulation from "./Components/Simulation";
import Plots from "./Components/Plots";
import { initgrid, move, carmoving, power, updateenter } from "../utils.mjs";

let policyobj = { policy: 0 };
let plotdata = { handoffs: 0, averagepower: -103 };
let running = 0;

const bstation = [
    {
        row: 5,
        col: 7
    },
    {
        row: 5,
        col: 21
    },
    {
        row: 15,
        col: 7
    },
    {
        row: 15,
        col: 21
    }
];

export default class Handoff extends Component {
    constructor() {
        super();

        this.state = {
            grid: [],
            cars: [
                //0:top, 1:right, 2:down, 3:left
                {
                    row: 5,
                    col: 0,
                    dir: 1,
                    bs: 0,
                    power: power(5, 0, bstation[0]),
                    handoff: false
                },
                {
                    row: 5,
                    col: 28,
                    dir: 3,
                    bs: 1,
                    power: power(5, 28, bstation[1]),
                    handoff: false
                },
                {
                    row: 15,
                    col: 0,
                    dir: 1,
                    bs: 2,
                    power: power(15, 0, bstation[2]),
                    handoff: false
                },
                {
                    row: 15,
                    col: 28,
                    dir: 3,
                    bs: 3,
                    power: power(15, 28, bstation[3]),
                    handoff: false
                }
            ],
            entrances: [
                {
                    row: 0,
                    col: 7,
                    arrowdir: 2,
                    carenter: -1
                },
                {
                    row: 0,
                    col: 21,
                    arrowdir: 2,
                    carenter: -1
                },
                {
                    row: 20,
                    col: 7,
                    arrowdir: 0,
                    carenter: -1
                },
                {
                    row: 20,
                    col: 21,
                    arrowdir: 0,
                    carenter: -1
                },
                {
                    row: 5,
                    col: 28,
                    arrowdir: 3,
                    carenter: -1
                },
                {
                    row: 15,
                    col: 28,
                    arrowdir: 3,
                    carenter: -1
                },
                {
                    row: 5,
                    col: 0,
                    arrowdir: 1,
                    carenter: -1
                },
                {
                    row: 15,
                    col: 0,
                    arrowdir: 1,
                    carenter: -1
                }
            ]
        };
    }

    componentDidMount() {
        let newgrid = initgrid(this.state.cars);

        this.setState({ grid: newgrid });
        let grid = this.state.grid;
        let cars = this.state.cars;
        let entrances = this.state.entrances;
        return (
            <div>
                <BootstrapNav></BootstrapNav>
                <div className="maincontent">
                    <div className="descontainer">
                        <div className="description">
                            <div className="goalcontainer">
                                <div className="intro goal">Goal</div>
                                <div className="intro intropower">
                                    Least Handoffs
                                </div>
                                <div className="intro introhandoffs">
                                    Highest Power
                                </div>
                            </div>
                            <BootstrapDrop
                                policyobj={policyobj}
                            ></BootstrapDrop>
                            <div
                                className="button"
                                onClick={() => this.handleClick()}
                            >
                                <div>Visualize</div>
                            </div>
                            <Icons></Icons>
                        </div>
                    </div>
                    <Simulation
                        grid={grid}
                        cars={cars}
                        entrances={entrances}
                    ></Simulation>
                </div>
                <div className="footer"></div>
            </div>
        );
    }

    handleClick() {
        if (running === 1) {
            running = 0;
            clearInterval(window.intervalid);
        } else {
            running = 1;
            window.intervalid = setInterval(() => {
                let newentrances = updateenter(
                    this.state.entrances,
                    this.state.cars
                );
                let newcars = carmoving(
                    this.state.entrances,
                    this.state.cars,
                    policyobj.policy,
                    plotdata
                );
                let newgrid = move(this.state.cars);
                this.setState({
                    grid: newgrid,
                    cars: newcars,
                    entrances: newentrances
                });
            }, 600);
        }
    }

    render() {
        let grid = this.state.grid;
        let cars = this.state.cars;
        let entrances = this.state.entrances;
        return (
            <div>
                <BootstrapNav></BootstrapNav>
                <div className="maincontent">
                    <div className="descontainer">
                        <div className="description">
                            <div className="goalcontainer">
                                <div className="intro goal">Goal</div>
                                <div className="intro intropower">
                                    Least Handoffs
                                </div>
                                <div className="intro introhandoffs">
                                    Highest Power
                                </div>
                            </div>
                            <BootstrapDrop
                                policyobj={policyobj}
                            ></BootstrapDrop>
                            <div
                                className="button"
                                onClick={() => this.handleClick()}
                            >
                                <div>Visualize</div>
                            </div>
                            <Icons></Icons>
                        </div>
                    </div>
                    <Simulation
                        grid={grid}
                        cars={cars}
                        entrances={entrances}
                    ></Simulation>
                    <Plots
                        cars={cars.length}
                        handoffs={plotdata.handoffs}
                        power={plotdata.averagepower}
                    ></Plots>
                </div>
                <div className="footer"></div>
            </div>
        );
    }
}
