import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import * as localeActions from 'modules/LocaleReducer';
import * as settingActions from 'modules/SettingReducer';
import { Switch, Text, View } from 'react-native';
import { setSettingApi } from 'api/Setting';
import { basicColor, dividerDarkColor, dividerLightColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

class SwitchButtonLayout extends Component {
    toggleSwitch = async value => {
        const { text, LocaleAction, SettingAction } = this.props;
        if (text !== 'language') {
            const data = { name: text, value: value ? 'on' : 'off' };
            await setSettingApi(data).then();
            await SettingAction.changeSetting(data);
        } else {
            await LocaleAction.setLanguage(this.props.locale.locale === 'ko' ? 'en' : 'ko');
        }
    };

    render() {
        const { text } = this.props;
        const { list } = this.props.setting;
        const { locale, lang } = this.props.locale;

        return (
            <View style={styles.container}>
                <View style={styles.textLayout}>
                    <Text style={styles.textStyle}>{lang[text]}</Text>
                </View>
                <View style={styles.toggleLayout}>
                    <Switch
                        onValueChange={this.toggleSwitch}
                        value={text === 'language' ? (locale === 'en' ? true : false) : list[text] === 'on' ? true : false}
                        thumbColor={dividerLightColor}
                        trackColor={{ false: dividerDarkColor, true: basicColor }}
                    />
                </View>
            </View>
        );
    }
}

SwitchButtonLayout.propTypes = {
    switchValue: PropTypes.bool,
    text: PropTypes.string.isRequired,
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
