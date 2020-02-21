<p align=center>
    <img src="img/handoff.PNG" width="636" height="391">
</p>

https://chonyy.github.io/handoff-visualizer/

## Policies Pseudocode

```javascript
//Power referred to P, base station referered to B
//Threshold referred to T, Entrophy referred to E

// Best Policy
if (Pnew > Pold) {
    car.bs = Bnew;
    car.power = Pnew;
}

//Threshold Policy
if (Pnew > Pold && Pold < T) {
    car.bs = Bnew;
    car.power = Pnew;
}

//Entrophy Policy
if (Pnew > Pold + E) {
    car.bs = Bnew;
    car.power = Pnew;
}

//Minimum Policy
if (Pnew < Pmin) {
    car.bs = Bnew;
    car.power = Pnew;
}
```

## Simulation Structure

<p align=center>
    <img src="img/simulation structure.PNG">
</p>
Each block is a 120*80(m^2). Cars are assummed to be moving on the line between blocks that doesn't take any space.

-   ⋋ = 1 cars/ min [ P(t) = ⋋"e" ^(−"⋋" ) (Hint: t is in sec) ]
-   Velocity = 72km/hr

### Car Entrance Distribution

The probability of the entrance follows [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution)<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/c22cb4461e100a6db5f815de1f44b1747f160048"> and <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/2debd3f9adf97c8af4919aa69ed4a7121b47a737">

In our simultation

-   ⋋ = 0.0167 cars/ sec
-   k = 1

### Received Power

The received power is calculated by the formula.

-   Base station transmission Pt(mW) = -50 dBm
-   Base = 1mW
-   10log(Pt/Base) = dBm
-   First-meter path loss = 10 dBm
-   P0 = -50 dBm
-   Pd = -60 - 20log(d(m)/1m)

## Demo Video

<p align=center>
    <a href="http://www.youtube.com/watch?feature=player_embedded&v=xNy4vw-d1m8
" target="_blank"><img src="http://img.youtube.com/vi/xNy4vw-d1m8/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="480" height="360" /></a>
</p>

## Parameter values

The different parameters for each policy are listed below

| Parameters |  Value   |
| ---------- | :------: |
| Threshold  | -108 dBm |
| Entrophy   |  5 dBm   |
| Minimum    | -112 dBm |

## Posssibility of turning

The possibility of changing direction when encountering intersection is listed below

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

**still writing docs, please wait for one to two days**

**still writing docs, please wait for one to two days**

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
