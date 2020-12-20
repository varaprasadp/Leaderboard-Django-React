import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { Input } from "@material-ui/core";
import { toast } from "react-toastify";

export default class AddTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  onTeamSubmit() {
    fetch("/api/team", {
      method: "POST",
      body: JSON.stringify({
        team_name: this.state.data,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 201) {
        toast.error("Unable to create a team");
      }
      if (response.status === 201) {
        toast.success("Team created successfully!");
      }
      return;
    });
  }
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" varient="h4">
            Create A Team
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <Input
              required={true}
              placeholder="Your Team Name Here"
              onChange={(event) => this.setState({ data: event.target.value })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="Primary"
            variant="contained"
            onClick={() => this.onTeamSubmit()}
          >
            Add Team
          </Button>
        </Grid>
      </Grid>
    );
  }
}
