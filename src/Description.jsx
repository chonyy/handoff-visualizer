import React, { Component } from "react";
import BootstrapDrop from "./BootstrapDrop";
import Icons from "./Icons";
import { initgrid, move, carmoving, power, updateenter } from "./utils.mjs";

let running = 0;

export default class Description extends Component {
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
        return (
            <div className="descontainer">
                <div className="description">
                    <div className="goalcontainer">
                        <div className="intro goal">Goal</div>
                        <div className="intro intropower">Least Handoffs</div>
                        <div className="intro introhandoffs">Highest Power</div>
                    </div>
                    <BootstrapDrop></BootstrapDrop>
                    <div className="button" onClick={() => this.handleClick()}>
                        <div>Visualize</div>
                    </div>
                    <Icons></Icons>
                </div>
            </div>
        );
    }
}
