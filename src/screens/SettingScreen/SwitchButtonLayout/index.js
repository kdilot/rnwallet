/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import * as localeActions from 'modules/LocaleReducer';
import * as settingActions from 'modules/SettingReducer';
import { Switch, Text, View, TouchableOpacity } from 'react-native';
import { setSettingApi } from 'api/Setting';
import { basicColor, dividerDarkColor, dividerLightColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

const ON = 'on';
const OFF = 'off';
const LANGUAGE_KOREAN = 'ko';
const LANGUAGE_ENGLISH = 'en';

class SwitchButtonLayout extends Component {
    toggleSwitch = async value => {
        const { text, SettingAction } = this.props;
        const data = { name: text, value: value ? ON : OFF };
        await setSettingApi(data).then();
        await SettingAction.changeSetting(data);
    };

    render() {
        const { text, LocaleAction } = this.props;
        const { list } = this.props.setting;
        const { locale, lang } = this.props.locale;

        return (
            <View style={styles.container}>
                <View style={styles.textLayout}>
                    <Text style={styles.textStyle}>{lang[text]}</Text>
                </View>
                <View style={styles.toggleLayout}>
                    {text === 'language' ? (
                        <View style={styles.languageLayout}>
                            <TouchableOpacity
                                style={[styles.languageGroup, locale === LANGUAGE_KOREAN && styles.selectedText, { marginRight: 10 }]}
                                onPress={() => {
                                    LocaleAction.setLanguage(LANGUAGE_KOREAN);
                                }}>
                                <Text style={[styles.languageTextStyle, locale === LANGUAGE_KOREAN && styles.selectedText]}>KO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.languageGroup, locale === LANGUAGE_ENGLISH && styles.selectedText]}
                                onPress={() => {
                                    LocaleAction.setLanguage(LANGUAGE_ENGLISH);
                                }}>
                                <Text style={[styles.languageTextStyle, locale === LANGUAGE_ENGLISH && styles.selectedText]}>EN</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Switch onValueChange={this.toggleSwitch} value={list[text] === ON ? true : false} thumbColor={dividerLightColor} trackColor={{ false: dividerDarkColor, true: basicColor }} />
                    )}
                </View>
            </View>
        );
    }
}

SwitchButtonLayout.propTypes = {
    switchValue: PropTypes.bool,
    text: PropTypes.string,
    locale: PropTypes.object,
    lang: PropTypes.array,
    toggleSwitch: PropTypes.func,
};

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
        locale: state.LocaleReducer,
        setting: state.SettingReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
        LocaleAction: bindActionCreators(localeActions, dispatch),
        SettingAction: bindActionCreators(settingActions, dispatch),
    }),
)(SwitchButtonLayout);
