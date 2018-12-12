import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Channels from './Channels/Channels';
import UserPanel from './UserPanel/UserPanel';
import DirectMessages from './DirectMessages/DirectMessages';
import Starred from './Starred/Starred';
class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { currentUser, primaryColor } = this.props;

        return (
            <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{
                    background: primaryColor,
                    fontSize: '1.2rem'
                }}>
                <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
                <Starred currentUser={currentUser}/>
                <Channels currentUser={currentUser} />
                <DirectMessages currentUser={currentUser} />
            </Menu>
        );
    }
}

export default SidePanel;