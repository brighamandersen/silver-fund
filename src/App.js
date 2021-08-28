// import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import MsgBanner from "./components/MsgBanner";
import Home from "./routes/Home";
import Positions from "./routes/positions/Positions";
import Trades from "./routes/Trades";
import Construction from "./routes/Construction";
import Risk from "./routes/risk/Risk";
import NotFound from "./routes/NotFound";
import Navbar from "./components/nav/Navbar";

const App = () => (
  <>
    <Header />
    <MsgBanner />
    <Router>
      <Navbar />
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
