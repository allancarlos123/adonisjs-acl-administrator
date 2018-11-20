import React, { Component } from "react"
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom"
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

import api from "../../services/api"
import { login } from "../../services/auth"

class LoginForm extends Component {
  submit = async values => {
    try {
      const response = await api.post("/login", values)
      login(response.data.token)
      this.props.history.push("/app")
    } catch (err) {
      console.log(err)
    }
  }
  
  render() {
    const { handleSubmit } = this.props
    
    return (
      <div className="login-form">
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit(this.submit)}>
          <Segment stacked>
            <Field
              component={Form.Input}
              name="email"
              placeholder="E-mail address"
              iconPosition="left"
              icon="user"
              type="email"
            />

            <Field
              component={Form.Input}
              name="password"
              placeholder="Password"
              iconPosition="left"
              icon="lock"
              type="password"
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
    )
  }
}

export default compose(
  withRouter,
  reduxForm({
    form: "signin"
  })
)(LoginForm)