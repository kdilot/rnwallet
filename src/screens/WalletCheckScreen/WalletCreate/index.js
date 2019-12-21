import React, { Component } from 'react';
import { Text, View, TextInput, Clipboard, Alert, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ButtonComp from 'components/ButtonComp';
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
        navigation.navigate('TabNavigator');
    };

    checkWord = value => {
        const { text, randomNumber, createDisable } = this.state;
        if (createDisable) {
            if (text[randomNumber - 1] === value) {
                this.setState({ createDisable: false });
                Alert.alert('확인되었습니다.');
            } else {
                Alert.alert('다시 확인해주세요.');
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
        return (
            <View style={styles.container}>
                <View style={styles.textareaLayout}>
                    <TextInput style={styles.textarea} multiline={true} textAlignVertical={'top'} editable={false} value={text.join('   ')} />
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComp name={'복사하기'} outline={true} onPress={this.onCopy} />
                </View>
                <View style={styles.confirmLayout}>
                    <View style={styles.confirmTextLayout}>
                        <Text>별도로 텍스트를 보관해주세요.</Text>
                        <Text>{`확인을 위해 ${randomNumber} 번째 단어를 선택해주세요.`}</Text>
                    </View>
                    <View style={styles.confirmGridLayout}>
                        <FlatGrid
                            items={shuffleText}
                            spacing={12}
                            itemDimension={(Dimensions.get('window').width - 50) / 4}
                            renderItem={({ item, index }) => (
                                <ButtonComp
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
                    <ButtonComp name={'생성하기'} disable={createDisable} onPress={this.onCreate} />
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
