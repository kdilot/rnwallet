import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import SwitchButtonLayout from './SwitchButtonLayout';
import SwipeablePanel from 'rn-swipeable-panel';
import PropTypes from 'prop-types';
import styles from './style';

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
                <View style={styles.panelLayout}>
                    <Text style={styles.titleLayout}>설정</Text>
                    {MenuList.map((item, index) => (
                        <ListItem key={index} title={<SwitchButtonLayout text={item.name} />} bottomDivider />
                    ))}
                </View>
            </SwipeablePanel>
        );
    }
}

SettingScreen.propTypes = {
    panelActive: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    focusListener: PropTypes.func,
    blurListener: PropTypes.func,
    openPanel: PropTypes.func,
    closePanel: PropTypes.func,
};
