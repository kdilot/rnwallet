import React, { Component } from 'react';
import { View, Text, AppState } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import styles from './FingerPrint.styles';
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
        FingerprintScanner.isSensorAvailable()
            .then(res =>
                this.setState({
                    isFingerprint: res,
                }),
            )
            .catch(e => {
                this.setState({ errorMessage: e.message });
                this.props.navigation.replace('PinCode');
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
            <View style={styles.container}>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                {isFingerprint && <FingerPrintPopup {...this.props} style={styles.popup} />}
            </View>
        );
    }
}

export default FingerPrint;
