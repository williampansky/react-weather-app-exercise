import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import { differenceInMinutes } from "date-fns";
import Api from "./api";
import TheApp from "./TheApp";
import LoaderIcon from "./components/LoaderIcon";
import "./styles/styles.css";
import "./styles/animation.css";
import "./vendor/fog.css";
import "./styles/stars.css";

const AppLoading = styled.div`
  & > div {
    width: 100px;
  }
`;

function App() {
  /**
   * @see [persisted-state]
   * {@link https://github.com/donavon/use-persisted-state}
   */
  const useWeatherState = createPersistedState("api"),
    useWeatherStateC = createPersistedState("apiC");
  const [api, setDataF] = useWeatherState(),
    [apiC, setDataC] = useWeatherStateC();

  /**
   * Calls axios.create() and sets localStorage data responses
   * with setDataF & setDataC via createPersistedState.
   * @function fetchData
   * @see [Reference] {@link https://www.robinwieruch.de/react-hooks-fetch-data/}
   */
  const fetchData = async () => {
    const result = await Api.get("?units=I");
    const resultCelcius = await Api.get();

    if (result.status_code !== 429) {
      console.log(result.data);
      setDataF(result.data);
    }

    if (resultCelcius.status_code !== 429) {
      console.log(resultCelcius.data);
      setDataC(resultCelcius.data);
    }
  };

  /**
   * Sets date timestamp tokens to localStorage. Compare token to
   * `threeHoursAgo`. If true, refresh our API.
   *
   * @method refreshApi
   * @see [StackOverflow]{@link https://stackoverflow.com/a/42529483}
   */
  const refreshApi = () => {
    const HOUR = 1000 * 60 * 60;
    const THREEHOURS = HOUR * 3;
    let threeHoursAgo = Date.now() - THREEHOURS;

    let token = localStorage.getItem("token");
    if (!token) localStorage.setItem("token", new Date());

    token = localStorage.getItem("token");
    let minutes = differenceInMinutes(token, threeHoursAgo);

    if (minutes < 0) {
      localStorage.removeItem("token");
      return true;
    } else {
      console.log("Minutes until Api refresh:", minutes);
      return false;
    }
  };

  useEffect(() => {
    if (!api || !apiC) fetchData();
    if (refreshApi() === true) fetchData();
  }, []);

  const Timestamp = new Date();
  const humanReadable = Timestamp.toLocaleString();

  if (!api || !apiC)
    return (
      <AppLoading>
        <LoaderIcon />
      </AppLoading>
    );
  else return <TheApp data={api} dataC={apiC} time={humanReadable} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
