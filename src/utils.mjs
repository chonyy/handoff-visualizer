const p = 0.0163911909;
const e = 5;
const t = -108;
const pMin = -112;

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

export function initgrid(cars) {
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

export function move(cars) {
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

export function carmoving(entrances, oldcars, policy, plotdata) {
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
            checkBS(car, policy, plotdata);
            carsingrid++;
            totalpower += car.power;
        }
    }
    plotdata.averagepower = totalpower / carsingrid;
    removecars(cars, cartoremove, entrances);
    return cars;
}

export function changedirection(car) {
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

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function removecars(cars, cartoremove, entrances) {
    for (let i = 0; i < cartoremove.length; i++) {
        let row = cartoremove[i].row;
        let col = cartoremove[i].col;
        // console.log(row, col);
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

export function carmovealongdir(car) {
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

export function checkBS(car, policy, plotdata) {
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
        plotdata.handoffs++;
        car.handoff = true;
    }
    //update power with original bs if no handoff
    else {
        car.power = pOld;
        car.handoff = false;
    }
}

export function power(carRow, carCol, bs) {
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

export function log10(val) {
    return Math.log(val) / Math.log(10);
}

export function dirTwochoices(dir, row, col) {
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

export function updateenter(entrances, cars) {
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
            newE[i].carenter = 0;
        }
    }

    return newE;
}
