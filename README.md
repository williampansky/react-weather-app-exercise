# Weather App v0.1.5

> Simple weather app using [create-react-app] in [CodeSandbox].

## Assignment

Develop a weather application with the following specifications:

-   [x] It should show the 5-day weather forecast for Dallas, TX.
-   [x] Your application should utilize ReactJS (usage of boilerplates such as Create React App are
        encouraged).
-   [ ] You should be able to toggle between Fahrenheit and Celsius.
-   [ ] It should match the provided comp as closely as possible on desktop.
-   [ ] We do not provide a mobile mockup as you will determine how that functions on your own.
-   [x] Icons should correspond to proper weather conditions.
-   [ ] It should be responsive, rendering appropriately on tablet, and handheld form factors.
-   [x] Your application may use any open weather API.
-   [ ] Your application should showcase one animation technique of your choosing in order to give the
        application some life.
-   [ ] _(Optional)_ Allow for user input to change location of forecast (city, state, or zip)

## Documentation & reference

-   [Weatherbit 5day/3hour](https://www.weatherbit.io/api/weather-forecast-5-day)
-   [Weatherbit 16day/daily](https://www.weatherbit.io/api/weather-forecast-16-day)

## Todo

-   [x] Initial research.
    -   [x] API: [weatherbit]
    -   [x] XHR: [axios]
    -   [x] Styles: [styled-components]
    -   [x] ~~State management: [mobx]~~
-   [x] Setup base-level project scaffold.
-   [ ] Plan out components.
    -   [x] `AppDay.jsx` - _Displays a single day of the upcoming 5-day week. It visually shows a user an abbreviated day name, an icon representing the day's projected weather conditions, and the temperature from the api call_.
    -   [x] `AppGraphic.jsx` - _Displays a static image representing the city/location selected; Dallas in this example._
    -   [ ] ...
-   [x] Develop base-level app wireframe.
-   [x] Install `styled-components` package.
-   [ ] Fine-tune scaffold and components.
-   [ ] Polish stylesheets.
-   [x] Download assets from Zelplin.io [provided comp].
-   [x] Integrate weather API.
-   [ ] Integrate accessibility.
-   [ ] Integrate Schema/SEO.
-   [ ] Integrate webapp (SPA) icons into HTML file.
-   [ ] Integrate meta tags into HTML file.
-   [ ] Refactor for responsiveness.
-   [ ] Refactor for semantic HTML.
-   [ ] Enhance with animations.
-   [ ] Write JEST tests.
-   [ ] Test on mobile & tablet devices.
-   [ ] Test for WCAG & accessibility.
-   [ ] Browser checks.

## Difficulties

### Api integration & state management

Coming off the heels of a data/api-driven Vue app, a serious hurdle I found myself struggling to get over was how to work with an Api and handle central state management in React. Vuex, Vue's solution to a store, made mutating central state a breeze.

#### Api response

Reading the Api response and selecting the correct index from the next weekday was initially confusing. Weatherbit's Api for a 5-day forecast returns an array (`response.data.data`) length of 39. Initially, when passing data into my `AppDay` component props, I went with the following:

```js
// omitted...
<Week>
    <AppDay day={api.data[1].timestamp_utc} />
    <AppDay day={api.data[2].timestamp_utc} />
    <AppDay day={api.data[3].timestamp_utc} />
    <AppDay day={api.data[4].timestamp_utc} />
    <AppDay day={api.data[5].timestamp_utc} />
</Week>
// etc...
```

My thought was, _"Okay. Today is obviously going to be `api.data[0]`, so the next likely sequence would be `[1]`, `[2]`, `[3]`, and so on._ It didn't initially occur to me why a 5-day forecast's data child array would contain 39 entries _(haha, silly me...)_. The length comes due to the endpoint returning 3-hour intervals for daily weather. So, depending on the time you ping it'll return a different response length. So, to resolve this, I opted for using the same service's 16-day/daily forecast endpoint. Now each entry is a single day, therefore my `Week` can be structed like I had originally anticipated.

#### Limiting Api calls

A free plan from [weatherbit] allows for 1,000 calls/day; therefore I needed a way to limit the number of calls I make. Since [CodeSandbox] can refresh you project's frontend view on the fly, not setting a limiting function could (and did, haha) send me requests through the roof! I did some Google-foo and came up with the following function:

```js
// omitted...
/**
 * Sets date timestamp tokens to localStorage. Compare token to
 * `threeHoursAgo`. If true, refresh our API.
 * @method refreshApi
 * @see [StackOverflow]{@link https://stackoverflow.com/a/42529483}
 */
const refreshApi = () => {
    const HOUR = 1000 * 60 * 60;
    const THREEHOURS = HOUR * 3;
    const threeHoursAgo = Date.now() - THREEHOURS;

    const token = localStorage.getItem('token');
    if (!token) localStorage.setItem('token', new Date());

    if (token < threeHoursAgo) {
        localStorage.setItem('token', new Date());
        return true;
    } else {
        return false;
    }
};
```

This little guy simply constructs a 3-hour variable, `THREEHOURS`, and a variable, `threeHoursAgo` that subtracts that from `Date.now()`. It uses `threeHoursAgo` in conjunction with a localStorage `token` to return a boolean. If the boolean returns true we'll refresh our Api call:

```js
useEffect(() => {
    if (refreshApi() === true) fetchData();
}, []);
```

#### Displaying conditional icons

The app requires that icons, _"... correspond to proper weather conditions."_ Considering there are a possible 38 different codes coming down from the api, and that we currently only have four icons available, a solution was required to ensure an icon displayed on the frontend regardless of the `response.data.weather.code` value. My solution was a helper function that takes in a number parameter and returns a filename string depending on the group which the param belonged to.

```js
const getIcon = code => {
    const icons = {
        cloudDrizzle: 'cloud-drizzle-sun',
        cloudDrizzleSun: 'cloud-drizzle-sun',
        cloudLightning: 'cloud-lightning',
        cloudSun: 'cloud-sun'
    };

    const groups = {
        drizzle: [300, 301, 302],
        general: [800, 801, 802, 803, 804, 900],
        hazards: [700, 711, 721, 731, 741, 751],
        rain: [500, 501, 502, 511, 520, 521, 522],
        snow: [600, 601, 602, 610, 611, 612, 621, 622, 623],
        thunderstorms: [200, 201, 202, 230, 231, 232, 233]
    };

    if (groups.drizzle.includes(code)) return icons.cloudDrizzle;
    else if (groups.general.includes(code)) return icons.cloudSun;
    else if (groups.hazards.includes(code)) return icons.cloudSun;
    else if (groups.rain.includes(code)) return icons.cloudDrizzle;
    else if (groups.snow.includes(code)) return icons.cloudDrizzle;
    else if (groups.thunderstorms.includes(code)) return icons.cloudLightning;
    else return icons.cloudSun;
};
```

Basically, I defined an `icons` object that contained key/value pairs of our available icon SVGs. I then constructed a `groups` object which contained child arrays that represent high-level definitions of weather conditions; such as `drizzle` or `snow`.

Now, using a `switch` statement here would be ideal—however, it could be hacky and abusive of the way `case` is evaluated (as our conditional relies on `array.includes()`). Therefore, I crafted an incredibly ugly `if/else` chain to determine the return output from our function. Some examples this in use are:

```js
getIcon(300); /** @returns {cloud-drizzle-sun} */
getIcon(802); /** @returns {cloud-sun} */
getIcon(511); /** @returns {cloud-drizzle-sun} */
getIcon(233); /** @returns {cloud-lightning} */
```

#### Switching between degrees

Handling the functionality to switch between Fahrenheit and Celsius proved particularly difficult.

**First**, I needed to work with [use-persisted-state] to retrieve and store both types of JSON strings from the Api.

```js
// before celcius integration
const useWeatherState = createPersistedState('api');
const [api, setData] = useWeatherState();

// after celcius integration
const useWeatherState = createPersistedState('apiF'),
    useWeatherStateC = createPersistedState('apiC');
const [apiF, setDataF] = useWeatherState(),
    [apiC, setDataC] = useWeatherStateC();
```

**Next**, I needed to find a way to swap between using `apiF` and `apiC` as dynamic parent objects to pass down the data. My first try revolved around setting up a conditional check and a two mutable `let` declarations:

```js
let api;
const selection = localStorage.getItem('degrees');
if (selection === 'F') api = apiF;
else if (selection === 'C') api = apiC;
else api = apiF;

let state = {
    cityName: api.city_name,
    stateCode: api.state_code,
    today: {
        temp: api.data[0].temp,
        date: api.data[0].valid_date,
        conditions: api.data[0]
    }
    // etc...
};
```

This worked on page refresh, however it did not dynamically through a `handleDegreesChange(event)` function.

<!-- LINKS -->

[axios]: https://github.com/axios/axios
[weatherbit]: https://rapidapi.com/weatherbit/api/weather?endpoint=59333c51e4b05d38a42ea925
[provided comp]: https://app.zeplin.io/project/5ba1b47aa324513a320e49d4/screen/5ba1b49bc3a9c758ba001261
[create-react-app]: https://github.com/facebook/create-react-app
[codesandbox]: https://codesandbox.io
[styled-components]: https://www.styled-components.com/
[mobx]: https://github.com/mobxjs/mobx
[codesandbox]: https://codesandbox.io
[use-persisted-state]: https://github.com/donavon/use-persisted-state
