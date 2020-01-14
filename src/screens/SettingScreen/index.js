import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { SwitchButtonComponent } from 'components';
import { SETTING_MENU_LIST } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './style';

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
        return (
            <View style={styles.panelLayout}>
                <FlatList
                    data={SETTING_MENU_LIST}
                    ItemSeparatorComponent={() => <View style={styles.dividerStyle} />}
                    ListFooterComponent={() => <View style={styles.dividerStyle} />}
                    renderItem={({ item }) => <SwitchButtonComponent text={item.name} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
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
