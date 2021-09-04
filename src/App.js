import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
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
import NotFound from "./routes/NotFound";
import { useBanner } from "./utils/BannerContext";
import SubNavbar from "./components/nav/SubNavbar";

const App = () => {
  const location = useLocation();
  const { clearMsg } = useBanner();

  useEffect(() => {
    clearMsg(); // When routes are changed, clear msg banner
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Header />
      <Navbar />
      <SubNavbar />
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
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
