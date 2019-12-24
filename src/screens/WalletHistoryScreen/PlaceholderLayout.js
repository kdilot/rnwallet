import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from 'rn-placeholder';

export default class Placeholderlayout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Placeholder style={styles.placeholderGroup} Animation={Shine} Left={props => <PlaceholderMedia size={55} style={props.style} />}>
                    <View style={styles.placeholderLayout}>
                        <View style={styles.barStyle}>
                            <PlaceholderLine height={'100%'} style={styles.borderRadius(2)} />
                        </View>
                        <View style={styles.textStyle}>
                            <PlaceholderLine style={styles.flex(2)} />
                            <PlaceholderLine style={styles.flex(1)} width={90} />
                            <PlaceholderLine style={styles.flex(1)} width={15} />
                            <PlaceholderLine style={styles.flex(1)} />
                            <PlaceholderLine style={styles.flex(1)} width={15} />
                            <PlaceholderLine style={styles.flex(1)} />
                            <PlaceholderLine style={styles.flex(1)} />
                        </View>
                    </View>
                </Placeholder>
                <Placeholder style={styles.placeholderGroup} Animation={Shine} Left={props => <PlaceholderMedia size={55} style={props.style} />}>
                    <View style={styles.placeholderLayout}>
                        <View style={styles.barStyle}>
                            <PlaceholderLine height={'100%'} style={styles.borderRadius(2)} />
                        </View>
                        <View style={styles.textStyle}>
                            <PlaceholderLine style={styles.flex(2)} />
                            <PlaceholderLine style={styles.flex(1)} width={90} />
                            <PlaceholderLine style={styles.flex(1)} width={15} />
                            <PlaceholderLine style={styles.flex(1)} />
                            <PlaceholderLine style={styles.flex(1)} width={15} />
                            <PlaceholderLine style={styles.flex(1)} />
                            <PlaceholderLine style={styles.flex(1)} />
                        </View>
                    </View>
                </Placeholder>
                <Placeholder style={styles.placeholderGroup} Animation={Shine} Left={props => <PlaceholderMedia size={55} style={props.style} />}>
                    <View style={styles.placeholderLayout}>
                        <View style={styles.barStyle}>
                            <PlaceholderLine height={'100%'} style={styles.borderRadius(2)} />
                        </View>
                        <View style={styles.textStyle}>
                            <PlaceholderLine style={styles.flex(2)} />
                            <PlaceholderLine style={styles.flex(1)} width={90} />
                            <PlaceholderLine style={styles.flex(1)} width={15} />
                            <PlaceholderLine style={styles.flex(1)} />
                            <PlaceholderLine style={styles.flex(1)} width={15} />
                            <PlaceholderLine style={styles.flex(1)} />
                            <PlaceholderLine style={styles.flex(1)} />
                        </View>
                    </View>
                </Placeholder>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 7,
    },
    placeholderGroup: {
        flex: 1,
        marginBottom: 10,
    },
    placeholderLayout: {
        flexDirection: 'row',
        height: '100%',
    },
    barStyle: {
        flex: 1,
        marginRight: 10,
    },
    textStyle: {
        flex: 30,
    },
    flex: size => ({
        flex: size,
    }),
    borderRadius: size => ({
        borderRadius: size,
    }),
});
