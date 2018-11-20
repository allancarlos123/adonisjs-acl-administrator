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

class RegisterForm extends Component {
  submit = async values => {
    try {
      await api.post("/register", values)
      this.props.history.push("/")
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
          Create an account
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
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          You already have an account? <Link to="/">Sign In</Link>
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
    form: "signup"
  })
)(RegisterForm)