# Weather App v0.1.4

> Simple weather app using [create-react-app] in [CodeSandbox].

## Assignment

Develop a weather application with the following specifications:

-   [ ] It should show the 5-day weather forecast for Dallas, TX.
-   [ ] Your application should utilize ReactJS (usage of boilerplates such as Create React App are
        encouraged).
-   [ ] You should be able to toggle between Fahrenheit and Celsius.
-   [ ] It should match the provided comp as closely as possible on desktop.
-   [ ] We do not provide a mobile mockup as you will determine how that functions on your own.
-   [ ] Icons should correspond to proper weather conditions.
-   [ ] It should be responsive, rendering appropriately on tablet, and handheld form factors.
-   [ ] Your application may use any open weather API.
-   [ ] Your application should showcase one animation technique of your choosing in order to give the
        application some life.
-   [ ] _(Optional)_ Allow for user input to change location of forecast (city, state, or zip)

## Documentation & reference

-   [Weatherbit](https://www.weatherbit.io/api/weather-forecast-5-day)

## Todo

-   [x] Initial research.
    -   [x] API: [weatherbit]
    -   [x] XHR: [axios]
    -   [x] Styles: [styled-components]
    -   [x] State management: [mobx]
-   [x] Setup base-level project scaffold.
-   [ ] Plan out components.
    -   [ ] `AppDay.jsx` - _Displays a single day of the upcoming 5-day week. It visually shows a user an abbreviated day name, an icon representing the day's projected weather conditions, and the temperature from the api call_.
    -   [ ] `AppGraphic.jsx` - _Displays a static image representing the city/location selected; Dallas in this example._
    -   [ ] ...
-   [x] Develop base-level app wireframe.
-   [x] Install `styled-components` package.
-   [ ] Fine-tune scaffold and components.
-   [ ] Polish stylesheets.
-   [x] Download assets from Zelplin.io [provided comp].
-   [x] Integrate weather API.
-   [ ] Integrate accessibility.
-   [ ] Integrate Schema/SEO.
-   [ ] Integrate app icons into HTML file.
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

<!-- LINKS -->

[axios]: https://github.com/axios/axios
[weatherbit]: https://rapidapi.com/weatherbit/api/weather?endpoint=59333c51e4b05d38a42ea925
[provided comp]: https://app.zeplin.io/project/5ba1b47aa324513a320e49d4/screen/5ba1b49bc3a9c758ba001261
[create-react-app]: https://github.com/facebook/create-react-app
[codesandbox]: https://codesandbox.io
[styled-components]: https://www.styled-components.com/
[mobx]: https://github.com/mobxjs/mobx
[codesandbox]: https://codesandbox.io
