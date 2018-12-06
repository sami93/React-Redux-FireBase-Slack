import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../../redux/actions'
class Channels extends React.Component {
    state = {
        activeChannel: '',
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        modal: false,
        firstLoad: true
    }
    addChannel = () => {
        const { channelsRef, channelName, channelDetails, user } = this.state;
        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL

            }
        };

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.closeModal();
            })
            .catch(err => {
                console.log(err);
            })
    }
    closeModal = () => this.setState({ modal: false, channelName: '', channelDetails: '' });

    componentDidMount() {
        this.addListerners();
    }
    componentWillMount() {
        this.removeListeners();
    }
    addListerners = () => {
        let loadChannels = [];
        this.state.channelsRef.on('child_added', snap => {
            loadChannels.push(snap.val());
            this.setState({ channels: loadChannels }, () => this.setFirstChannel());
        })

    }

    removeListeners = () => {
        this.state.channelsRef.off();
    }
    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel);
        }
        this.setState({ firstLoad: false });
    }

    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        this.props.setPrivateChannel(false);
    }

    setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id })
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel();
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => { this.changeChannel(channel) }}
                name={channel.name}
                style={{ opacity: 0.7 }}
                active={channel.id === this.state.activeChannel}
            >
                # {channel.name}
            </Menu.Item>
        ))
    )
    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;
    openModal = () => this.setState({ modal: true });
    render() {
        const { channels, modal } = this.state;
        return (
            <React.Fragment>
                <Menu.Menu className="menu">
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" /> Channels
                </span>{' '}
                        ({channels.length}) <Icon name="add" onClick={this.openModal} />
                    </Menu.Item>
                    {this.displayChannels(channels)}
                </Menu.Menu>
                {/*  Add Channel Modal */}
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header> Add a channel </Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Name of Channel"
                                    name="channelName"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="About the Channel"
                                    name="channelDetails"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit} >
                            <Icon name="checkmark" /> Add
                    </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove" /> Cancel
                            {/* Reset the value of input state */}
                        </Button>
                    </Modal.Actions>
                </Modal >
            </React.Fragment>
        );
    }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Channels);