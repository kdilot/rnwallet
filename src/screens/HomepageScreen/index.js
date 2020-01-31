import React, { Component } from 'react';
import { Dimensions, View, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class HomePageScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <WebView
                    source={{ uri: 'https://rozeus.io/' }}
                    style={[{ width: WIDTH, height: HEIGHT }]}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={[styles.loadingLayout, { width: WIDTH, height: HEIGHT }]}>
                            <Text>Loading</Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        );
    }
}
