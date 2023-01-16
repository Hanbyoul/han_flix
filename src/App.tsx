import Helmets from "./Helmets";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Componenst/Header";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
      <Router>
        <Helmets />
        <Header />
        <Switch>
          <Route path={["/tv", "/tv/:tvId"]}>
            <Tv />
          </Route>
          <Route path={["/search"]}>
            <Search />
          </Route>
          <Route path={["/", "/movies/:movieId"]}>
            <Home />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
