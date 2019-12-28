import React, { Component } from 'react';
import { Text, View, TextInput, Clipboard, Alert, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ButtonComponent from 'components/ButtonComponent';
import PropTypes from 'prop-types';
import styles from './styles';

export default class WalletCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ['seal', 'economist', 'compact', 'concept', 'screw', 'celebration', 'poison', 'articulate', 'create', 'great', 'sheep', 'translate'],
            shuffleText: [],
            createDisable: true,
            randomNumber: Math.floor(Math.random() * 12) + 1,
        };
    }

    componentDidMount = () => {
        const { text } = this.state;
        this.shuffleWords(text);
    };

    onCopy = async () => {
        const { text } = this.state;
        await Clipboard.setString(text.join('   '));
        await Alert.alert(text.join('   '));
    };

    onCreate = () => {
        //  Token 생성 로직 추가
        const { navigation } = this.props;
        navigation.navigate('Home');
    };

    checkWord = value => {
        const { text, randomNumber, createDisable } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        if (createDisable) {
            if (text[randomNumber - 1] === value) {
                this.setState({ createDisable: false });
                Alert.alert(lang.pressCreateMsg);
            } else {
                Alert.alert(lang.checkAgainMsg);
            }
        }
    };

    shuffleWords = array => {
        let arr = array.slice();
        let j, x, i;
        for (i = arr.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = arr[i - 1];
            arr[i - 1] = arr[j];
            arr[j] = x;
        }
        this.setState({ shuffleText: arr });
    };

    render() {
        const { text, createDisable, randomNumber, shuffleText } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <View style={styles.container}>
                <View style={styles.textareaLayout}>
                    <TextInput style={styles.textarea} multiline={true} textAlignVertical={'top'} editable={false} value={text.join('   ')} />
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent name={lang.copy} outline={true} onPress={this.onCopy} />
                </View>
                <View style={styles.confirmLayout}>
                    <View style={styles.confirmTextLayout}>
                        <Text>{lang.createSaveTextMsg}</Text>
                        <Text>{lang.createConfirmWordMsgOne}{` [ ${randomNumber} ] `}{lang.createConfirmWordMsgTwo}</Text>
                    </View>
                    <View style={styles.confirmGridLayout}>
                        <FlatGrid
                            items={shuffleText}
                            spacing={12}
                            itemDimension={(Dimensions.get('window').width - 50) / 4}
                            renderItem={({ item, index }) => (
                                <ButtonComponent
                                    name={item}
                                    onPress={() => {
                                        this.checkWord(item);
                                    }}
                                />
                            )}
                        />
                    </View>
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent name={lang.create} disable={createDisable} onPress={this.onCreate} />
                </View>
            </View>
        );
    }
}

WalletCreate.proptypes = {
    text: PropTypes.array,
    shuffleText: PropTypes.array,
    createDisable: PropTypes.bool,
    randomNumber: PropTypes.number,
    onCopy: PropTypes.func,
    checkWord: PropTypes.func,
    shuffleWords: PropTypes.func,
};
