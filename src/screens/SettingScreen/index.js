import React, { Component } from 'react';
// import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import SwitchButtonLayout from './SwitchButtonLayout';
import SwipeablePanel from 'rn-swipeable-panel';

const MenuList = [
    {
        name: 'Push',
    },
    {
        name: 'Pin',
    },
    {
        name: '지문인식',
    },
    {
        name: '언어설정',
    },
];

export default class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelActive: false,
        };
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.openPanel();
        });
        this.blurListener = navigation.addListener('didBlur', () => {
            this.closePanel();
        });
    };

    componentWillUnmount = () => {
        this.focusListener.remove();
        this.blurListener.remove();
    };

    openPanel = () => {
        this.setState({ panelActive: true });
    };

    closePanel = flag => {
        const { navigation } = this.props;
        this.setState({ panelActive: false });
        if (flag) {
            navigation.navigate('Home');
        }
    };

    render() {
        const { panelActive } = this.state;
        return (
            <SwipeablePanel
                fullWidth
                isActive={panelActive}
                onClose={this.closePanel}
                onPressCloseButton={() => {
                    this.closePanel(true);
                }}
                showCloseButton={true}
                openLarge={true}>
                {/* <Text>asdfsadf</Text> */}
                {MenuList.map((item, index) => (
                    <ListItem key={index} title={<SwitchButtonLayout text={item.name} />} bottomDivider />
                ))}
            </SwipeablePanel>
        );
    }
}
