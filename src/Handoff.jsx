import React, { Component } from "react";
import Node from "./Node";
import uuidv4 from "uuid/v4";
import Line from "./Line";
import Entrance from "./Entrance";
import Data from "./Data";
import BootstrapNav from "./BootstrapNav";
import "./Handoff.css";
import BootstrapDrop from "./BootstrapDrop";
import Icons from "./Icons";
import Description from "./Description";
import Simulation from "./Simulation";
import Plots from "./Plots";
import Dropdown from "react-bootstrap/Dropdown";
import { initgrid, move, carmoving, power, updateenter } from "./utils.mjs";

let policy = 0;
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
                        <BootstrapDrop></BootstrapDrop>
                        <div
                            className="button"
                            onClick={() => this.handleClick()}
                        >
                            <div>Visualize</div>
                        </div>
                        <Icons></Icons>
                    </div>
                </div>
                <div className="simcontainer">
                    <div className="simulation">
                        <div className="board">
                            {grid.map(row => {
                                return (
                                    <div key={uuidv4()} className="roww">
                                        {row.map(node => {
                                            // console.log(node);
                                            return (
                                                <Node
                                                    key={uuidv4()}
                                                    row={node.row}
                                                    col={node.col}
                                                    visiting={node.visiting}
                                                    path={node.path}
                                                    bs={node.bs}
                                                    power={node.power}
                                                    handoff={node.handoff}
                                                ></Node>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            {cars.map(car => {
                                return (
                                    <Line
                                        key={uuidv4()}
                                        row={car.row}
                                        col={car.col}
                                        bs={car.bs}
                                        handoff={car.handoff}
                                    ></Line>
                                );
                            })}
                        </div>
                        <div>
                            {entrances.map(e => {
                                let entering = -1;
                                if (e.carenter === 0) entering = 0;
                                else if (e.carenter === 1) entering = 1;
                                e.carenter = -1;
                                return (
                                    <Entrance
                                        key={uuidv4()}
                                        row={e.row}
                                        col={e.col}
                                        dir={e.arrowdir}
                                        enter={entering}
                                    ></Entrance>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="datacontainer">
                    <div className="datas">
                        <Data type={"cars"} data={cars.length}></Data>
                        <Data type={"handoffs"} data={plotdata.handoffs}></Data>
                        <Data
                            type={"power"}
                            data={plotdata.averagepower}
                        ></Data>
                    </div>
                </div>
            </div>
        );
    }

    handledrop(clicked) {
        if (clicked === 0) {
            document.getElementById("dropdown-basic").innerHTML = "Best Policy";
            policy = 0;
        } else if (clicked === 1) {
            document.getElementById("dropdown-basic").innerHTML =
                "Threshsold Policy";
            policy = 1;
        } else if (clicked === 2) {
            document.getElementById("dropdown-basic").innerHTML =
                "Entrophy Policy";
            policy = 2;
        } else if (clicked === 3) {
            document.getElementById("dropdown-basic").innerHTML =
                "Minimum Policy";
            policy = 3;
        }
    }

    handleClick() {
        if (running === 1) {
            running = 0;
            clearInterval(window.intervalid);
        } else {
            running = 1;
            window.intervalid = setInterval(() => {
                console.log(running);
                let newentrances = updateenter(
                    this.state.entrances,
                    this.state.cars
                );
                let newcars = carmoving(
                    this.state.entrances,
                    this.state.cars,
                    policy,
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
                            <Dropdown>
                                <Dropdown.Toggle
                                    size="lg"
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    Best Policy
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => this.handledrop(0)}
                                    >
                                        Best Policy
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => this.handledrop(1)}
                                    >
                                        Threshold Policy
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => this.handledrop(2)}
                                    >
                                        Entrophy Policy
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => this.handledrop(3)}
                                    >
                                        Minimum Policy
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div
                                className="button"
                                onClick={() => this.handleClick()}
                            >
                                <div>Visualize</div>
                            </div>
                            <Icons></Icons>
                        </div>
                    </div>
                    <div className="simcontainer">
                        <div className="simulation">
                            <div className="board">
                                {grid.map(row => {
                                    return (
                                        <div key={uuidv4()} className="roww">
                                            {row.map(node => {
                                                // console.log(node);
                                                return (
                                                    <Node
                                                        key={uuidv4()}
                                                        row={node.row}
                                                        col={node.col}
                                                        visiting={node.visiting}
                                                        path={node.path}
                                                        bs={node.bs}
                                                        power={node.power}
                                                        handoff={node.handoff}
                                                    ></Node>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                {cars.map(car => {
                                    return (
                                        <Line
                                            key={uuidv4()}
                                            row={car.row}
                                            col={car.col}
                                            bs={car.bs}
                                            handoff={car.handoff}
                                        ></Line>
                                    );
                                })}
                            </div>
                            <div>
                                {entrances.map(e => {
                                    let entering = -1;
                                    if (e.carenter === 0) entering = 0;
                                    else if (e.carenter === 1) entering = 1;
                                    e.carenter = -1;
                                    return (
                                        <Entrance
                                            key={uuidv4()}
                                            row={e.row}
                                            col={e.col}
                                            dir={e.arrowdir}
                                            enter={entering}
                                        ></Entrance>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="datacontainer">
                        <div className="datas">
                            <Data type={"cars"} data={cars.length}></Data>
                            <Data
                                type={"handoffs"}
                                data={plotdata.handoffs}
                            ></Data>
                            <Data
                                type={"power"}
                                data={plotdata.averagepower}
                            ></Data>
                        </div>
                    </div>
                </div>
                <div className="footer"></div>
            </div>
        );
    }
}
