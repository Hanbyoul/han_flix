import Helmets from "./Helmets";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Componenst/Header";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Helmets />
          <Header />
          <Switch>
            <Route
              path={[
                `${process.env.PUBLIC_URL}/tv`,
                `${process.env.PUBLIC_URL}/tv/:tvId`,
              ]}
            >
              <Tv />
            </Route>
            <Route path={[`${process.env.PUBLIC_URL}/search`]}>
              <Search />
            </Route>
            <Route
              path={[
                `${process.env.PUBLIC_URL}/`,
                `${process.env.PUBLIC_URL}/movies/:movieId`,
              ]}
            >
              <Home />
            </Route>
          </Switch>
        </Router>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
