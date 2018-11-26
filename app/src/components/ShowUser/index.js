import React, { Component } from 'react'
import { Button, Form, Header, Image, Modal } from "semantic-ui-react";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Select } from "react-semantic-redux-form";

import { userFetch, rolesFetch } from "../../actions/users"
import api from "../../services/api";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

class ShowUser extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired
  };

  state = {
    user: [],
    roles: [],
  };

  submit = async values => {
    const { id } = this.props.match.params;

    const data = new FormData()
    data.append('email', values.email)
    data.append('password', values.password)
    data.append('roles_id', values.roles_id)

    if (values.profile_pic) {
      data.append('profile_pic', values.profile_pic)
    }
    
    try {
      await api.put(`/users/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      await this.props.fetchUser(id);
      await this.props.fetchRoles();

      const rolesOptions = await this.props.roles.map(role => ({
        key: role.id,
        text: role.name,
        value: role.id
      }));

      this.setState({ roles: rolesOptions });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { user } = this.props.user;
    const { handleSubmit } = this.props;

    return (
      <Modal open style={{ top: "20%" }}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={user.avatar} />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <Form onSubmit={handleSubmit(this.submit)}>
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
                icon="key"
                type="password"
              />

              <Field
                name="roles_id"
                component={Select}
                placeholder="Roles"
                options={this.state.roles}
              />

              <Field name="profile_pic" component={FileInput} type="file" />

              <Button>Edit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = ({ user, roles }) => ({
  user,
  roles: roles.roles,
  initialValues: {
    email: user.user.email,
    roles_id: user.user.roles && user.user.roles[0].id
  }
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (id) => dispatch(userFetch(id)),
  fetchRoles: () => dispatch(rolesFetch())
})

ShowUser = reduxForm({
  form: "editUser",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  updateUnregisteredFields: true,
})(ShowUser);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShowUser)
);
