import React, { Component } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import ButtonComponent from 'components/ButtonComponent';
import PropTypes from 'prop-types';
import styles from './styles';

export default class WalletRestore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null,
            restoreDisable: true,
        };
    }
    onRestore = () => {
        //  mnemonic 데이터 복구 로직 추가

        const { navigation } = this.props;
        navigation.navigate('TabNavigator');
    };

    onChangeText = text => {
        this.setState({ text, restoreDisable: text ? false : true });
    };

    render() {
        const { text, restoreDisable } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.textareaLayout}>
                    <Text style={styles.textStyle}>보관하셨던 단어 12개를 순서대로 입력해주세요.</Text>
                    <TextInput style={styles.textareaStyle} multiline={true} textAlignVertical={'top'} value={text} onChangeText={this.onChangeText} />
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent name={'복구하기'} disable={restoreDisable} onPress={this.onRestore} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

WalletRestore.propTypes = {
    text: PropTypes.string,
    restoreDisable: PropTypes.bool,
};
