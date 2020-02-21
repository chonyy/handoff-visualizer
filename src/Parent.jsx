import React, { Component } from "react";
import Child from "./child";
import uuidv4 from "uuid/v4";
import Line from "./Line";
import Entrance from "./Entrance";
import Data from "./Data";
import Dropdown from "react-bootstrap/Dropdown";
import Icons from "./Icons";
import "./Parent.css";

const p = 0.0163911909;
const e = 5;
const t = -108;
const pMin = -112;
let policy = 0;
let handoffs = 0;
let averagepower = -103;
let carsnumlist = [];
let cnt = 0;

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

export default class Parent extends Component {
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
        return (
            <div className="containerr">
                <div className="board">
                    {grid.map(row => {
                        return (
                            <div className="containerr">
                                {/* <div className="firstRow"> */}

                                <div className="maincontent">
                                    {/* </div> */}
                                    <div className="description">
                                        <div
                                            className="button"
                                            onClick={() => this.handleClick()}
                                        >
                                            <div>Visualize</div>
                                        </div>
                                    </div>
                                    <div className="simulation">
                                        <div className="board">
                                            {grid.map(row => {
                                                return (
                                                    <div
                                                        key={uuidv4()}
                                                        className="roww"
                                                    >
                                                        {row.map(node => {
                                                            // console.log(node);
                                                            return (
                                                                <Child
                                                                    key={uuidv4()}
                                                                    row={
                                                                        node.row
                                                                    }
                                                                    col={
                                                                        node.col
                                                                    }
                                                                    visiting={
                                                                        node.visiting
                                                                    }
                                                                    path={
                                                                        node.path
                                                                    }
                                                                    bs={node.bs}
                                                                    power={
                                                                        node.power
                                                                    }
                                                                    handoff={
                                                                        node.handoff
                                                                    }
                                                                ></Child>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="datas">
                                        <Data
                                            type={"cars"}
                                            data={this.state.cars.length}
                                        ></Data>
                                        <Data
                                            type={"handoffs"}
                                            data={handoffs}
                                        ></Data>
                                        <Data
                                            type={"power"}
                                            data={averagepower}
                                        ></Data>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
        // setInterval(() => {
        //     let newcars = carmoving(this.state.cars);
        //     let newgrid = move(this.state.cars);
        //     this.setState({ grid: newgrid, cars: newcars });
        // }, 10);
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                let newentrances = updateenter(
                    this.state.entrances,
                    this.state.cars
                );
                let newcars = carmoving(this.state.entrances, this.state.cars);
                let newgrid = move(this.state.cars);
                this.setState({
                    grid: newgrid,
                    cars: newcars,
                    entrances: newentrances
                });
            }, 500 * i);
        }
    }

    render() {
        let grid = this.state.grid;
        let cars = this.state.cars;
        let entrances = this.state.entrances;
        // checkpolicy();

        return (
            <div className="containerr">
                <div className="maincontent">
                    <div className="description">
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
                    <div className="simulation">
                        <div className="board">
                            {grid.map(row => {
                                return (
                                    <div key={uuidv4()} className="roww">
                                        {row.map(node => {
                                            // console.log(node);
                                            return (
                                                <Child
                                                    key={uuidv4()}
                                                    row={node.row}
                                                    col={node.col}
                                                    visiting={node.visiting}
                                                    path={node.path}
                                                    bs={node.bs}
                                                    power={node.power}
                                                    handoff={node.handoff}
                                                ></Child>
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
                    <div className="datas">
                        <Data type={"cars"} data={cars.length}></Data>
                        <Data type={"handoffs"} data={handoffs}></Data>
                        <Data type={"power"} data={averagepower}></Data>
                    </div>
                </div>
            </div>
        );
    }
}

function initgrid(cars) {
    let newgrid = [];
    for (let i = 0; i < 21; i++) {
        let row = [];
        for (let j = 0; j < 29; j++) {
            let current = false;
            let power = 0;
            let handoff = false;
            for (let k = 0; k < cars.length; k++) {
                if (i === cars[k].row && j === cars[k].col) {
                    current = true;
                    power = cars[k].power;
                    handoff = cars[k].handoff;
                    break;
                }
            }
            let bs = -1;
            let pathroad = i % 5 === 0 || j % 7 === 0 ? true : false;
            if (i === 5 && j === 7) bs = 0;
            else if (i === 5 && j === 21) bs = 1;
            else if (i === 15 && j === 7) bs = 2;
            else if (i === 15 && j === 21) bs = 3;
            row.push({
                row: i,
                col: j,
                visiting: current,
                path: pathroad,
                bs: bs,
                power: power,
                handoff: handoff
            });
        }
        newgrid.push(row);
    }
    return newgrid;
}

function move(cars) {
    let newgrid = [];
    for (let i = 0; i < 21; i++) {
        let row = [];
        for (let j = 0; j < 29; j++) {
            let current = false;
            let power = 0;
            let handoff = false;
            for (let k = 0; k < cars.length; k++) {
                if (i === cars[k].row && j === cars[k].col) {
                    current = true;
                    power = cars[k].power;
                    handoff = cars[k].handoff;
                    break;
                }
            }
            let bs = -1;
            let pathroad = i % 5 === 0 || j % 7 === 0 ? true : false;
            if (i === 5 && j === 7) bs = 0;
            else if (i === 5 && j === 21) bs = 1;
            else if (i === 15 && j === 7) bs = 2;
            else if (i === 15 && j === 21) bs = 3;
            row.push({
                row: i,
                col: j,
                visiting: current,
                path: pathroad,
                bs: bs,
                power: power,
                handoff: handoff
            });
        }
        newgrid.push(row);
    }
    return newgrid;
}

function carmoving(entrances, oldcars) {
    let cars = [...oldcars];
    let cartoremove = [];
    let carsingrid = 0;
    let totalpower = 0;
    for (let i = 0; i < cars.length; i++) {
        let car = cars[i];
        if (car.row < 0 || car.row > 20 || car.col < 0 || car.col > 28)
            cartoremove.push(car);
        else {
            if (car.row % 5 === 0 && car.col % 7 === 0) changedirection(car);
            carmovealongdir(car);
            checkBS(car);
            carsingrid++;
            totalpower += car.power;
        }
    }
    averagepower = totalpower / carsingrid;
    removecars(cars, cartoremove, entrances);
    return cars;
}

function changedirection(car) {
    let orig = car.dir;
    let randnum = getRandomInt(0, 5);
    // at corner
    if (car.row % 20 === 0 && car.col % 28 === 0) {
        if (car.row === 0 && car.col === 0) {
            if (orig === 0) orig = 1;
            else if (orig === 3) orig = 2;
        } else if (car.row === 20 && car.col === 0) {
            if (orig === 3) orig = 0;
            else if (orig === 2) orig = 1;
        } else if (car.row === 0 && car.col === 28) {
            if (orig === 1) orig = 2;
            else if (orig === 0) orig = 3;
        } else if (car.row === 20 && car.col === 28) {
            if (orig === 2) orig = 3;
            else if (orig === 1) orig = 0;
        }
    }
    // crossroad with two choices
    else if (
        (car.row === 0 && car.col === 14) ||
        (car.row === 10 && car.col === 0) ||
        (car.row === 10 && car.col === 28) ||
        (car.row === 20 && car.col === 14)
    ) {
        let dirs = dirTwochoices(car.dir, car.row, car.col);
        if (randnum <= 2) {
            orig = dirs[0];
        } else {
            orig = dirs[1];
        }
    } else {
        // turn left
        if (randnum === 0) orig--;
        // turn right
        else if (randnum === 1 || randnum === 2) orig++;
    }

    if (orig === -1) orig = 3;
    orig %= 4;
    car.dir = orig;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removecars(cars, cartoremove, entrances) {
    for (let i = 0; i < cartoremove.length; i++) {
        let row = cartoremove[i].row;
        let col = cartoremove[i].col;
        console.log(row, col);
        if (row === -1 && col === 7) entrances[0].carenter = 1;
        else if (row === -1 && col === 21) entrances[1].carenter = 1;
        else if (row === 21 && col === 7) entrances[2].carenter = 1;
        else if (row === 21 && col === 21) entrances[3].carenter = 1;
        else if (row === 5 && col === 29) entrances[4].carenter = 1;
        else if (row === 15 && col === 29) entrances[5].carenter = 1;
        else if (row === 5 && col === -1) entrances[6].carenter = 1;
        else if (row === 15 && col === -1) entrances[7].carenter = 1;

        cars.splice(cars.indexOf(cartoremove[i]), 1);
    }
}

function carmovealongdir(car) {
    if (car.dir === 2) {
        car.row++;
    } else if (car.dir === 0) {
        car.row--;
    } else if (car.dir === 1) {
        car.col++;
    } else if (car.dir === 3) {
        car.col--;
    }
}

function checkBS(car) {
    let handoff = false;
    let pOld = power(car.row, car.col, bstation[car.bs]);
    let powerReceived = [];
    powerReceived.push(power(car.row, car.col, bstation[0]));
    powerReceived.push(power(car.row, car.col, bstation[1]));
    powerReceived.push(power(car.row, car.col, bstation[2]));
    powerReceived.push(power(car.row, car.col, bstation[3]));

    let pNew = Math.max(...powerReceived);
    let newBS = powerReceived.indexOf(pNew);

    if (policy === 0) {
        if (pNew > pOld) {
            car.bs = newBS;
            car.power = pNew;
            handoff = true;
            console.log("best");
        }
    } else if (policy === 1) {
        if (pNew > pOld && pOld < t) {
            console.log("new", pNew);
            console.log("old", pOld);
            car.bs = newBS;
            car.power = pNew;
            handoff = true;
            console.log("threshold");
        }
    } else if (policy === 2) {
        if (pNew > pOld + e) {
            car.bs = newBS;
            car.power = pNew;
            handoff = true;
            console.log("entrophy");
        }
    } else if (policy === 3) {
        if (pOld < pMin) {
            car.bs = newBS;
            car.power = pNew;
            handoff = true;
            console.log("minimum");
        }
    }

    if (handoff) {
        handoffs++;
        car.handoff = true;
    }
    //update power with original bs if no handoff
    else {
        car.power = pOld;
        car.handoff = false;
    }
}

function power(carRow, carCol, bs) {
    let powerVal = 0;
    let xdiff = Math.abs(carCol - bs.col) * 20;
    let ydiff = Math.abs(carRow - bs.row) * 20;
    let dist = (xdiff ** 2 + ydiff ** 2) ** (1 / 2);
    if (dist === 0) {
        powerVal = -50;
    } else {
        powerVal = -60 - 20 * log10(dist);
    }
    return powerVal;
}

function log10(val) {
    return Math.log(val) / Math.log(10);
}

function dirTwochoices(dir, row, col) {
    let dirs = [0, 1, 2, 3];
    let dirtodelete = (dir + 2) % 4;

    dirs.splice(dirs.indexOf(dirtodelete), 1);
    if (row === 0 && col === 14) {
        dirs.splice(dirs.indexOf(0), 1);
    } else if (row === 10 && col === 0) {
        dirs.splice(dirs.indexOf(3), 1);
    } else if (row === 10 && col === 28) {
        dirs.splice(dirs.indexOf(1), 1);
    } else if (row === 20 && col === 14) {
        dirs.splice(dirs.indexOf(2), 1);
    }

    return dirs;
}

function updateenter(entrances, cars) {
    let newE = [...entrances];

    for (let i = 0; i < 8; i++) {
        let randnum = Math.random();
        let enter = randnum < p;
        if (enter) {
            //top 2
            if (i === 0) {
                cars.push({
                    row: 0,
                    col: 7,
                    dir: 2,
                    bs: 0,
                    power: power(0, 7, bstation[0])
                });
            } else if (i === 1) {
                cars.push({
                    row: 0,
                    col: 21,
                    dir: 2,
                    bs: 1,
                    power: power(0, 21, bstation[1])
                });
            }
            //bottom 2
            else if (i === 2) {
                cars.push({
                    row: 20,
                    col: 7,
                    dir: 0,
                    bs: 2,
                    power: power(20, 7, bstation[2])
                });
            } else if (i === 3) {
                cars.push({
                    row: 20,
                    col: 21,
                    dir: 0,
                    bs: 3,
                    power: power(20, 21, bstation[3])
                });
            }
            //right 2
            else if (i === 4) {
                cars.push({
                    row: 5,
                    col: 28,
                    dir: 3,
                    bs: 1,
                    power: power(5, 28, bstation[1])
                });
            } else if (i === 5) {
                cars.push({
                    row: 15,
                    col: 28,
                    dir: 3,
                    bs: 3,
                    power: power(15, 28, bstation[3])
                });
            }
            //left 2
            else if (i === 6) {
                cars.push({
                    row: 5,
                    col: 0,
                    dir: 2,
                    bs: 0,
                    power: power(5, 0, bstation[0])
                });
            } else if (i === 7) {
                cars.push({
                    row: 15,
                    col: 0,
                    dir: 2,
                    bs: 2,
                    power: power(15, 0, bstation[2])
                });
            }
            // console.log("entering", newE[i]);
            newE[i].carenter = 0;
        }
    }

    return newE;
}

function updateremove(entrances, cars) {
    for (let i = 0; i < cars.length; i++) {
        let row = cars[i].row;
        let col = cars[i].col;
        let dir = cars[i].dir;
        // console.log(row, col, dir);
        if (row === 0 && col === 7 && dir === 0) entrances[0].carenter = 1;
        else if (row === 0 && col === 21 && dir === 0)
            entrances[1].carenter = 1;
        else if (row === 20 && col === 7 && dir === 2)
            entrances[2].carenter = 1;
        else if (row === 20 && col === 21 && dir === 2)
            entrances[3].carenter = 1;
        else if (row === 5 && col === 28 && dir === 1)
            entrances[4].carenter = 1;
        else if (row === 15 && col === 28 && dir === 1)
            entrances[5].carenter = 1;
        else if (row === 5 && col === 0 && dir === 3) entrances[6].carenter = 1;
        else if (row === 15 && col === 0 && dir === 3)
            entrances[7].carenter = 1;
    }
}

function checkpolicy() {
    let policytext = document.getElementById("dropdownMenuButton").textContent;
    if (policytext === "Best Policy") policy = 0;
    else if (policytext === "Threshold Policy") policy = 1;
    else if (policytext === "Entrophy Policy") policy = 2;
    else if (policytext === "Minimum Policy") policy = 3;
}
