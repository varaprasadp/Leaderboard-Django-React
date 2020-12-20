import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Table from "./Table";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      };
  }
  componentDidMount() {
    fetch("/api/teams")
      .then((response) => {
        if (response.status > 400) {
          return <h1>Something went wrong! <br /> please try again later.</h1>;
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
         
            data,
            loaded: true,
        });
      });
  }

  render() {
    return (
      <Container>
        <Paper>
              <Table data={this.state.data} />
        </Paper>
      </Container>
    );
  }
}
