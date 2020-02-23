import React, { Component } from "react";
import Data from "./Data";

export default class Plots extends Component {
    render() {
        let cars = this.props.cars;
        let handoffs = this.props.handoffs;
        let power = this.props.power;

        return (
            <div className="datacontainer">
                <div className="datas">
                    <Data type={"cars"} data={cars}></Data>
                    <Data type={"handoffs"} data={handoffs}></Data>
                    <Data type={"power"} data={power}></Data>
                </div>
            </div>
        );
    }
}
