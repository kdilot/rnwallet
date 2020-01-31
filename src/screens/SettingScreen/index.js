import React, { Component } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import { SwitchButtonComponent, ToastComponent } from 'components';
import AsyncStorage from '@react-native-community/async-storage';
import { SETTING_MENU_LIST } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './style';

class SettingScreen extends Component {
    componentDidMount = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async payload => {
            if (payload.state.params) {
                this.onSwitch(payload.state.params.name);
            }
            const pincode = await AsyncStorage.getItem('pincode');
            if (!pincode) {
                this.onSwitch('pin', false);
            }
        });
    };

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    onSwitch = (name, value = true) => {
        const { SettingAction } = this.props;
        const data = { name, value };
        SettingAction.changeSetting(data);
    };

    onToast = msg => {
        this.toast.showToast(msg);
    };

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.panelLayout}>
                <FlatList
                    data={SETTING_MENU_LIST}
                    ItemSeparatorComponent={() => <View style={styles.dividerStyle} />}
                    ListFooterComponent={() => <View style={styles.dividerStyle} />}
                    renderItem={({ item }) => <SwitchButtonComponent navigation={navigation} onToast={this.onToast} name={item.name} />}
                    keyExtractor={(item, index) => index.toString()}
                />
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </SafeAreaView>
        );
    }
}

SettingScreen.propTypes = {
    pincode: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    onSwitch: PropTypes.func,
    onToast: PropTypes.func,
};

export default connect(
    state => ({
        setting: state.SettingReducer,
    }),
    dispatch => ({
        SettingAction: bindActionCreators(settingActions, dispatch),
    }),
)(SettingScreen);
