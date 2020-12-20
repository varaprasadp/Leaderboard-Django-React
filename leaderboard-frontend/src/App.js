import "./App.css";
import React from "react";
import Button from "@material-ui/core/Button";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Match from "./screens/Match";
import AddTeam from "./screens/AddTeam";
import Homepage from "./screens/Homepage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// use default theme
// const theme = createMuiTheme();

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    Primary: {
      main: "#3f51b5",
    },
    Secondary: {
      main: "#ff1744",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <div style={{ margin: "2rem", padding: "3rem" }}>
            <Button color="Primary" variant="outlined" href="/">
              Leaderboard
            </Button>{" "}
            <Button color="Primary" variant="outlined" href="/CreateTeam">
              CreateTeam
            </Button>{" "}
            <Button color="Primary" variant="outlined" href="/Match">
              Match
            </Button>
          </div>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/Match" component={Match} />
            <Route path="/CreateTeam" component={AddTeam} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
