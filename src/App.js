// import "./styles.css";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";
import Navbar from "./components/nav/Navbar";
import MsgBanner from "./components/MsgBanner";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import Home from "./routes/Home";
import PositionsSnapshot from "./routes/positions/PositionsSnapshot";
import PositionsHistory from "./routes/positions/PositionsHistory";
import Trades from "./routes/Trades";
import Construction from "./routes/Construction";
import Risk from "./routes/risk/Risk";
import NotFound from "./routes/NotFound";
import RiskSnapshot from "./routes/risk/RiskSnapshot";
import RiskThroughTime from "./routes/risk/RiskThroughTime";
import RiskWhatIf from "./routes/risk/RiskWhatIf";

const App = () => (
  <>
    <Header />
    <Router>
      <Navbar />
      <MsgBanner />
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute
          path="/positions/snapshot"
          component={PositionsSnapshot}
        />
        <PrivateRoute path="/positions/history" component={PositionsHistory} />
        <PrivateRoute exact path="/positions">
          <Redirect to="/positions/snapshot" />
        </PrivateRoute>
        <PrivateRoute path="/trades" component={Trades} />
        <PrivateRoute path="/construction" component={Construction} />
        <PrivateRoute path="/risk/snapshot" component={RiskSnapshot} />
        <PrivateRoute path="/risk/through-time" component={RiskThroughTime} />
        <PrivateRoute path="/risk/what-if" component={RiskWhatIf} />
        <PrivateRoute exact path="/risk">
          <Redirect to="/risk/snapshot" />
        </PrivateRoute>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
    <Footer />
  </>
);

export default App;
