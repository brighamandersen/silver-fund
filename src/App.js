import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Login from "./routes/Login";
import MsgBanner from "./components/shared/MsgBanner";
import Home from "./routes/Home";
import Positions from "./routes/Positions";
import Trades from "./routes/Trades";
import Construction from "./routes/Construction";
import Risk from "./routes/Risk";
import NotFound from "./routes/NotFound";

const App = () => (
  <>
    <Navbar />
    <MsgBanner />
    {/* <Panes */}
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/positions" component={Positions} />
        <PrivateRoute path="/trades" component={Trades} />
        <PrivateRoute path="/construction" component={Construction} />
        <PrivateRoute path="/risk" component={Risk} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
    <Footer />
  </>
);

export default App;
