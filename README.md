<p align=center>
    <img src="img/demo.gif">
</p>

<p align=center>
    <a target="_blank" href="https://travis-ci.com/chonyy/handoff-visualizer" title="Build Status"><img src="https://travis-ci.com/chonyy/handoff-visualizer.svg?branch=master"></a>
    <a target="_blank" href="#" title="language count"><img src="https://img.shields.io/github/languages/count/chonyy/handoff-visualizer"></a>
    <a target="_blank" href="#" title="top language"><img src="https://img.shields.io/github/languages/top/chonyy/handoff-visualizer?color=orange"></a>
    <a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
    <a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
    <a target="_blank" href="#" title="repo size"><img src="https://img.shields.io/github/repo-size/chonyy/handoff-visualizer"></a>
    <a target="_blank" href="http://makeapullrequest.com" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</p>

> 📶 Visualizing the transmission between users and base stations!

Play with it! https://chonyy.github.io/handoff-visualizer/

Handoff is the **transition** for any given user of signal transmission from one base station to a geographically adjacent base station as the user moves around. In this project, we **visualize** the process of handoff by generating cars moving around the blocks and connecting them to different base stations based on different policies.

This project is to **visualize** handoff and make the concept of handoff in wireless network easy to understand. **Different policies** are implemented to perform the handoff in different situations. The goal is to make the users try out all the different policies, understand the differences, and find out the most efficient policy.

If your are interested in this visualiztion, please also check out the [handoff-simulator](https://github.com/chonyy/handoff-simulator). We want people to understand handoff in this visualizer project, and we **value the data** in that [handoff-simulator](https://github.com/chonyy/handoff-simulator).

## Simulation Structure

<p align=center>
    <img src="img/simulation structure.PNG" width="558" height="393">
</p>
Each node is a 20 * 20 (m^2) square. A block is composed of 24 nodes, whick makes the block size 120 * 80 (m^2). Cars are assummed to be moving on an extremely thin line path between blocks, the path doesn't take up any space. The velocity of the car is 20m/s. In our simulation, we iterate once in a second. The cars move one node, and all the data are calculated and updated every second.

-   **Velocity** = 72km/hr = 20m/s
-   **Probability of cars entrance** follows [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution)
-   **⋋** = 1 cars/ min [ P(t) = ⋋"e" ^(−"⋋" ) (t is in sec) ]
-   **Probability of cars turning** based on predefined value listed below
-   **Received Power Calculation** explained below

### Car Entrance Distribution

The probability of the entrance follows [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution)<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/c22cb4461e100a6db5f815de1f44b1747f160048"> and <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/2debd3f9adf97c8af4919aa69ed4a7121b47a737">

In our simultation

-   **⋋** = 0.0167 cars/ sec
-   **k** = 1

### Received Power

The received power is calculated by the formula below. Read [ScienceDirect](https://www.sciencedirect.com/topics/engineering/received-signal-power) to dig deeper.

-   Base station transmission Pt(mW) = -50 dBm
-   Base = 1mW
-   10log(Pt / Base) = dBm
-   First-meter path loss = 10 dBm
-   **P0 = -50 dBm**
-   **Pd = -50 - 10 - 20log(d(m) / 1m)**

## Policies Pseudocode

Received Power referred to **P**, base station referered to **B**.

Threshold referred to **T**, entrophy referred to **E**.

### Best Policy

```javascript
if (Pnew > Pold) {
    car.bs = Bnew;
    car.power = Pnew;
}
```

### Threshold Policy

```javascript
if (Pnew > Pold && Pold < T) {
    car.bs = Bnew;
    car.power = Pnew;
}
```

### Entrophy Policy

```javascript
if (Pnew > Pold + E) {
    car.bs = Bnew;
    car.power = Pnew;
}
```

### Minimum Policy

```javascript
if (Pnew < Pmin) {
    car.bs = Bnew;
    car.power = Pnew;
}
```

## Demo Video

<p align=center>
    <a href="http://www.youtube.com/watch?feature=player_embedded&v=xNy4vw-d1m8
" target="_blank"><img src="http://img.youtube.com/vi/xNy4vw-d1m8/0.jpg" 
alt="demo video" width="480" height="360" /></a>
</p>

## What is handoff?

<p align=center>
    <img src="img/handoff.PNG" width="636" height="391">
</p>

[Handoff](https://searchmobilecomputing.techtarget.com/definition/handoff) is the **transition** for any given user of signal transmission from one base station to a geographically adjacent base station as the user **moves around**.

Each time a mobile or portable cellular subscriber passes from one cellinto another, the network automatically **switches** coverage responsibility from one basestation to another. Each base-station transition, as well as the switching processor sequence itself, is called handoff.

## Policies parameter value

The different parameters for each policy are listed below.

| Parameters |  Value   |
| ---------- | :------: |
| Threshold  | -108 dBm |
| Entrophy   |  5 dBm   |
| Minimum    | -112 dBm |

## Posssibility of turning

The possibility of changing direction when encountering intersection is listed below.

### Intersection with four roads

| Direction   | Possibility |
| ----------- | :---------: |
| Go straight |     1/2     |
| Turn right  |     1/3     |
| Turn left   |     1/6     |

### Intersection with three roads

| Direction  | Possibility |
| ---------- | :---------: |
| Turn right |     1/2     |
| Turn left  |     1/2     |

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
