/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from 'modules/LocaleReducer';
import * as settingActions from 'modules/SettingReducer';
import { Switch, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Icon } from 'components';
import { LANG_TYPE } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './styles';

const PIN = 'pin';
const FINGERPRINT = 'fingerprint';

class SwitchButtonComponent extends Component {
    toggleSwitch = async value => {
        const { name, SettingAction, navigation, onToast } = this.props;
        const { lang } = this.props.locale;
        const { list } = this.props.setting;
        const data = { name, value };
        let pincode = null;

        await SettingAction.changeSetting(data);
        pincode = await AsyncStorage.getItem('pincode');
        if (name === PIN && !list.pin && !pincode) {
            await navigation.navigate('PinCode');
        } else if (name === FINGERPRINT && !list.fingerprint) {
            FingerprintScanner.isSensorAvailable()
                .then(() => {
                    if (!list.pin) {
                        onToast(lang.pinFirstMsg);
                        SettingAction.changeSetting({ name, value: false });
                    }
                })
                .catch(() => {
                    onToast(lang.fingerprintSettingMsg);
                    SettingAction.changeSetting({ name, value: false });
                });
        }
    };

    render() {
        const { name, LocaleAction } = this.props;
        const { list } = this.props.setting;
        const { locale, lang } = this.props.locale;

        return (
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={() => {
                    name !== 'language' && this.toggleSwitch(!list[name]);
                }}>
                <View style={styles.textLayout}>
                    <Text style={styles.textStyle}>{lang[name]}</Text>
                </View>
                <View style={styles.toggleLayout}>
                    {name === 'language' ? (
                        <View style={styles.languageLayout}>
                            {LANG_TYPE.map((language, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.languageGroup, locale === language && styles.selectedText]}
                                    onPress={() => {
                                        LocaleAction.setLanguage(language);
                                    }}>
                                    <ImageBackground source={Icon[locale === language ? `${language}_s` : language]} style={{ width: 50, height: 28 }} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <Switch
                            onValueChange={value => {
                                this.toggleSwitch(value);
                            }}
                            value={list[name]}
                            thumbColor={'white'}
                            trackColor={{ false: '#e1e1e1', true: '#fb8325' }}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}

SwitchButtonComponent.propTypes = {
    switchValue: PropTypes.bool,
    name: PropTypes.string,
    locale: PropTypes.object,
    lang: PropTypes.array,
    toggleSwitch: PropTypes.func,
};

export default connect(
    state => ({
        locale: state.LocaleReducer,
        setting: state.SettingReducer,
    }),
    dispatch => ({
        LocaleAction: bindActionCreators(localeActions, dispatch),
        SettingAction: bindActionCreators(settingActions, dispatch),
    }),
)(SwitchButtonComponent);
