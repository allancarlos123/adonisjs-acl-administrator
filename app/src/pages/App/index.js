import React, { Component } from "react";
import {
  Container,
  Grid,
  Header,
} from "semantic-ui-react";

import UsersList from "../../components/UsersList"

const App = () => (
  <Container style={{ marginTop: "3em" }}>
    <Header as="h1" dividing>Theming Examples</Header>

    <Grid stackable>
      <Grid.Column>
        <UsersList />
      </Grid.Column>
    </Grid>
  </Container>
);

export default App