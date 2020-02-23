import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import Node from "./Node";
import Line from "./Line";
import Entrance from "./Entrance";

export default class Simulation extends Component {
    render() {
        let grid = this.props.grid;
        let cars = this.props.cars;
        let entrances = this.props.entrances;

        return (
            <div className="simcontainer">
                <div className="simulation">
                    <div className="board">
                        {grid.map(row => {
                            return (
                                <div key={uuidv4()} className="roww">
                                    {row.map(node => {
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
        );
    }
}
