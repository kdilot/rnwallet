import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from 'modules/LocaleReducer';
import * as settingActions from 'modules/SettingReducer';
import { Switch, Text, View, TouchableOpacity } from 'react-native';
import { basicColor, dividerDarkColor, dividerLightColor } from 'constants/Color';
import { LANG_TYPE } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './styles';

class SwitchButtonComponent extends Component {
    toggleSwitch = async value => {
        const { text, SettingAction } = this.props;
        const data = { name: text, value: value };
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
                            {LANG_TYPE.map((language, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.languageGroup, locale === language && styles.selectedText]}
                                    onPress={() => {
                                        LocaleAction.setLanguage(language);
                                    }}>
                                    <Text style={[styles.languageTextStyle, locale === language && styles.selectedText]}>{language.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <Switch onValueChange={this.toggleSwitch} value={list[text]} thumbColor={dividerLightColor} trackColor={{ false: dividerDarkColor, true: basicColor }} />
                    )}
                </View>
            </View>
        );
    }
}

SwitchButtonComponent.propTypes = {
    switchValue: PropTypes.bool,
    text: PropTypes.string,
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
