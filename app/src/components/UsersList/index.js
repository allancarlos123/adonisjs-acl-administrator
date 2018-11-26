import React, { Component, Fragment } from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { ModalRoute, ModalLink } from "react-router-modal";
import { Link, withRouter } from "react-router-dom"
import {
  Modal,
  Button,
  Header,
  Image,
  Table,
  Checkbox,
  Icon,
  Grid,
  Pagination
} from "semantic-ui-react";

import { usersFetch } from "../../actions/users"

import ShowUser from "../ShowUser"

class UsersList extends Component {
  state = {
    activePage: 1,
    totalPages: 1,
    users: []
  };

  async componentDidMount() {
    const { activePage } = this.state

    await this.props.fetchUsers(activePage);
    
    this.setState({users: this.props.users.users.data})
    this.setState({totalPages: this.props.users.users.lastPage})
  }
  
  handleInputChange = (e, { value }) => this.setState({ activePage: value });
  
  handlePaginationChange = async (e, { activePage }) => {
    await this.setState({ activePage })
    await this.props.fetchUsers(this.state.activePage);
    this.setState({users: this.props.users.users.data})
  };

  render() {
    const { activePage, totalPages } = this.state
    const {
      users: { users, isFetching, fetchError },
      match,
      history
    } = this.props;
    
    return (
      <Fragment>
        <Grid columns={2} verticalAlign='middle'>
          <Grid.Column>
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={totalPages}
            />
          </Grid.Column>
        </Grid>
        <Table celled compact definition>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Premium Plan</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell collapsing>
                  <Checkbox slider />
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image src={user.avatar} rounded size="mini" />
                    <Header.Content>
                      Lena
                    <Header.Subheader>
                        {user.roles.map(role => (
                          <Fragment key={role.id}>{role.name}</Fragment>
                        ))}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{user.created_at}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Link to={`/app/users/${user.id}`}>Show</Link>
                  {/* <Link to={`/app/users/${user.id}`}>Show</Link> */}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="4">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                >
                  <Icon name="user" /> Add User
              </Button>

                <Button size="small">Approve</Button>
                <Button disabled size="small">
                  Approve All
              </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <ModalRoute
          path={`${match.url}/users/:id`}
          parentPath={match.url}
          component={ShowUser}
        />
        <Modal trigger={<Button>Show Modal</Button>} centered={false}>
          <Modal.Content>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: (activePage) => dispatch(usersFetch(activePage))
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UsersList)