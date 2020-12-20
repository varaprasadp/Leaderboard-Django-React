import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { toast } from "react-toastify";
export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      teamA: null,
      teamB: "",
      selectTeam: "",
      disabledB: true,
    };
  }
  componentDidMount() {
    fetch("/api/teams")
      .then((response) => {
        if (response.status > 400) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        this.setState(() => {
          return {
            data,
            loaded: true,
          };
        });
      });
  }
  onTeamSubmit(teamname, score) {
    fetch("/api/teamUpdate", {
      method: "PUT",
      body: JSON.stringify({
        team_name: teamname,
        score: score,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 201) {
        toast.error("Unable to update score");
      }
      if (response.status === 201) {
        toast.success("Score updated successfully!");
      }
      return;
    });
  }
  onResultSubmit(judgement) {
    let score;
    if (judgement === "won") {
      score = 2;
      this.onTeamSubmit(this.state.selectTeam, score);
    }
    if (judgement === "lost") {
      score = 2;
      this.onTeamSubmit(
        this.state.selectTeam === this.state.teamA
          ? this.state.teamB
          : this.state.teamA,
        score
      );
    }
    if (judgement === "tied") {
      score = 1;
      this.onTeamSubmit(this.state.teamA, score);
      this.onTeamSubmit(this.state.teamB, score);
    }
  }
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" varient="h4">
            Start Match
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Autocomplete
            id="Select Team A"
            options={this.state.data}
            getOptionLabel={(option) => option.team_name}
            style={{ width: 300 }}
            onChange={(event, teamA) =>
              this.setState({ teamA: teamA.team_name, disabledB: false })
            }
            renderInput={(params) => (
              <TextField {...params} label="TeamA" variant="outlined" />
            )}
          />
          <Autocomplete
            id="Select Team B"
            options={this.state.data}
            getOptionLabel={(option) => option.team_name}
            style={{ width: 300 }}
            onChange={(event, teamB) =>
              this.setState({ teamB: teamB.team_name })
            }
            renderInput={(params) => (
              <TextField {...params} label="TeamB" variant="outlined" />
            )}
          />
          <div style={{ marginLeft: "47vw" }}>
            <RadioGroup
              aria-label="team"
              onChange={(event) => {
                this.setState({
                  selectTeam: event.target.value,
                });
              }}
            >
              <FormControlLabel
                value={this.state.teamA}
                control={<Radio />}
                label="TeamA"
              />
              <FormControlLabel
                value={this.state.teamB}
                control={<Radio />}
                label="TeamB"
              />
            </RadioGroup>
          </div>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.onResultSubmit("won")}
          >
            Won
          </Button>
          {"  "}
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.onResultSubmit("lost")}
          >
            Lost
          </Button>
          {"  "}
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.onResultSubmit("tied")}
          >
            Tied
          </Button>
        </Grid>
      </Grid>
    );
  }
}
