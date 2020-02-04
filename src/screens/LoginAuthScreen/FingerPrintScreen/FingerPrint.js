import React, { Component } from 'react';
import { Text, AppState, SafeAreaView } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import S from './FingerPrint.styles';
import FingerPrintPopup from './FingerPrintPopup';

class FingerPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: null,
            isFingerprint: null,
            errorMessage: null,
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.detectFingerprintAvailable();
    }

    componentWillUnmount() {
        FingerprintScanner.release();
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    detectFingerprintAvailable = () => {
        const { sendData } = this.props.navigation.state.params;
        FingerprintScanner.isSensorAvailable()
            .then(res =>
                this.setState({
                    isFingerprint: res,
                }),
            )
            .catch(e => {
                this.setState({ errorMessage: e.message });
                this.props.navigation.replace('PinCode', { sendData });
            });
    };

    handleAppStateChange = nextAppState => {
        const { appState } = this.state;
        if (appState && appState.match(/inactive|background/) && nextAppState === 'active') {
            FingerprintScanner.release();
            this.detectFingerprintAvailable();
        }
        this.setState({ appState: nextAppState });
    };

    render() {
        const { isFingerprint, errorMessage } = this.state;
        return (
            <SafeAreaView style={S.container}>
                {errorMessage && <Text style={S.errorMessage}>{errorMessage}</Text>}
                {isFingerprint && <FingerPrintPopup {...this.props} style={S.popup} />}
            </SafeAreaView>
        );
    }
}

export default FingerPrint;
