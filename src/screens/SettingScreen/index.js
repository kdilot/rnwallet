import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import { SwitchButtonComponent } from 'components';
import { SETTING_MENU_LIST } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './style';

class SettingScreen extends Component {
    componentDidMount = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', payload => {
            if (payload.state.params) {
                this.onSwitch(payload.state.params.name);
            }
        });
    };

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    onSwitch = async name => {
        const { SettingAction } = this.props;
        const data = { name, value: true };
        await SettingAction.changeSetting(data);
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.panelLayout}>
                <FlatList
                    data={SETTING_MENU_LIST}
                    ItemSeparatorComponent={() => <View style={styles.dividerStyle} />}
                    ListFooterComponent={() => <View style={styles.dividerStyle} />}
                    renderItem={({ item }) => <SwitchButtonComponent name={item.name} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

SettingScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    focusListener: PropTypes.func,
    blurListener: PropTypes.func,
};

export default connect(
    state => ({
        setting: state.SettingReducer,
    }),
    dispatch => ({
        SettingAction: bindActionCreators(settingActions, dispatch),
    }),
)(SettingScreen);
