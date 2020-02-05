import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderLine, Shine } from 'rn-placeholder';

export default class Placeholderlayout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Placeholder Animation={Shine}>
                    <PlaceholderLine style={styles.lineLayout} height={45} />
                </Placeholder>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
    },
    lineLayout: {
        borderRadius: 5,
    },
});
