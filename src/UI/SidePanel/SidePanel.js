import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Channels from './Channels/Channels';
import UserPanel from './UserPanel/UserPanel';
class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { currentUser } = this.props;

        return (
            <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{
                    background: '#4c3c4c',
                    fontSize: '1.2rem'
                }}>
                <UserPanel currentUser={currentUser} />
                <Channels />
            </Menu>
        );
    }
}

export default SidePanel;