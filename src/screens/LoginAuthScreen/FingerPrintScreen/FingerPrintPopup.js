import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { IconComponent } from 'components';
import AnimationText from './styles.animation';
import S from './FingerPrintPopup.styles';

class FingerPrintPopup extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: undefined };
    }

    componentDidMount() {
        FingerprintScanner.authenticate({
            onAttempt: this.handleAuthenticationAttempted,
        })
            .then(() => {
                // this.props.handlePopupDismissed();
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                // Error Type
                // AuthenticationNotMatch	No match
                // AuthenticationFailed	Authentication was not successful because the user failed to provide valid credentials
                // UserCancel	Authentication was canceled by the user - e.g. the user tapped Cancel in the dialog
                // UserFallback	Authentication was canceled because the user tapped the fallback button (Enter Password)
                // SystemCancel	Authentication was canceled by system - e.g. if another application came to foreground while the authentication dialog was up
                // PasscodeNotSet	Authentication could not start because the passcode is not set on the device
                // FingerprintScannerNotAvailable	Authentication could not start because Fingerprint Scanner is not available on the device
                // FingerprintScannerNotEnrolled	Authentication could not start because Fingerprint Scanner has no enrolled fingers
                // FingerprintScannerUnknownError	Could not authenticate for an unknown reason
                // FingerprintScannerNotSupported	Device does not support Fingerprint Scanner
                // DeviceLocked	Authentication was not successful, the device currently in a lockout of 30 seconds
                this.setState({ errorMessage: error.message });
                this.description.shake();
            });
    }

    componentWillUnmount() {
        FingerprintScanner.release();
    }

    handleAuthenticationAttempted = error => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
    };

    render() {
        const { errorMessage } = this.state;
        const { navigation } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');

        return (
            <View style={S.ContainerView}>
                <View style={[S.ContentView]}>
                    <View style={S.LogoView}>
                        <IconComponent name={'img_fingerprint'} size={60} />
                    </View>
                    <View style={S.MessageView}>
                        <AnimationText
                            ref={instance => {
                                this.description = instance;
                            }}
                            style={S.Description(errorMessage)}>
                            {errorMessage || lang.fingerprintMsg}
                        </AnimationText>
                    </View>

                    <TouchableOpacity
                        style={S.ButtonView}
                        onPress={() => {
                            navigation.navigate('PinCode');
                        }}>
                        <Text style={S.ButtonText}>{lang.usePinMsg}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

FingerPrintPopup.propTypes = {
    style: ViewPropTypes.style,
};

export default FingerPrintPopup;
