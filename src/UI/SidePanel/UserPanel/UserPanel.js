import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../../firebase'
class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser
        };
    }

    // componentDidMount() {
    //     this.setState({ user: this.props.currentUser });
    // }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ user: nextProps.currentUser });
    // }
    dropdownoptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}> Sign out   </ span>
        }


    ]
    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('signed out!'))
    }
    render() {
        const { user } = this.state;
        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/* App Header */}
                        <Header inverted floated="left" as="h2"  >
                            <Icon name="code" />

                            <Header.Content>
                                DevChat
                            </Header.Content>

                        </Header>
                        {/* User DropDown */}
                        <Header style={{ padding: '0.25em' }} as="h4" inverted>
                            <Dropdown trigger={<span> <Image src={user.photoURL} spaced="right" avatar />{this.state.user.displayName}</span>} options={this.dropdownoptions()} />
                        </Header>
                    </Grid.Row>

                </Grid.Column>
            </Grid>
        );
    }
}

// const mapStateToProps = state => ({
//     currentUser: state.user.currentUser
// })
// const mapStateToProps = ({ user }) => ({
//     currentUser: user.currentUser
// })
export default UserPanel;