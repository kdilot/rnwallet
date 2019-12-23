import React, { Component } from 'react';
import { Text, View, AppState } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import styles from './FingerPrint.styles';
import FingerPrintPopup from './FingerPrintPopup';

class FingerPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
            biometric: undefined,
            popupShowed: false,
        };
    }

    handleFingerprintShowed = () => {
        this.setState({ popupShowed: true });
    };

    handleFingerprintDismissed = () => {
        this.setState({ popupShowed: false });
    };

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        // Get initial fingerprint enrolled
        this.detectFingerprintAvailable();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    detectFingerprintAvailable = () => {
        FingerprintScanner.isSensorAvailable()
            .then(res =>
                this.setState({
                    biometric: res,
                }),
            )
            .catch(error => {
                this.setState({
                    errorMessage: error.name,
                });
                setTimeout(() => {
                    this.props.navigation.navigate('PinCode');
                }, 1500);
            });
    };

    handleAppStateChange = nextAppState => {
        if (this.state.appState && this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            FingerprintScanner.release();
            this.detectFingerprintAvailable();
        }
        this.setState({ appState: nextAppState });
    };

    render() {
        const { errorMessage, biometric } = this.state;

        return (
            <View style={styles.container}>
                {errorMessage && (
                    <Text style={styles.errorMessage}>
                        {errorMessage} {biometric}
                    </Text>
                )}
                {biometric && <FingerPrintPopup {...this.props} style={styles.popup} />}
            </View>
        );
    }
}

export default FingerPrint;
