/* eslint-disable react-native/no-inline-styles */

//  임시 테스트 페이지

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from 'modules/LocaleReducer';
import { Button, View, Text, StyleSheet } from 'react-native';

class Locale extends Component {
    componentDidMount() {
        const { LocaleAction } = this.props;
        LocaleAction.getLocale();
        // this.props.navigation.openDrawer();
    }

    render() {
        const { LocaleAction, locale } = this.props;
        return (
            <View>
                <View>
                    <Text style={styles.container}>{locale.lang.msg}</Text>
                </View>
                <View>
                    <View style={styles.btnLayout}>
                        <Button title={locale.lang.slk} onPress={() => LocaleAction.setLanguage('ko')} style={{ marginVertical: 10 }} />
                    </View>
                    <View style={styles.btnLayout}>
                        <Button title={locale.lang.sle} onPress={() => LocaleAction.setLanguage('en')} style={{ marginVertical: 10 }} />
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(
    state => ({
        locale: state.LocaleReducer,
    }),
    dispatch => ({
        LocaleAction: bindActionCreators(localeActions, dispatch),
    }),
)(Locale);

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 10,
    },
    btnLayout: {
        padding: 10,
        margin: 5,
    },
});
