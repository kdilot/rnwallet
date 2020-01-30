import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FlatList } from 'react-navigation';
import FaqComponent from '../../components/FaqComponent';

export default class CustomerServiceScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOnFaqTab: true,
            isOnEmailTab: false,
            faqList: [
                { no: 4, title: 'FAQ1', contents: '내용1' },
                { no: 3, title: 'FAQ2', contents: '내용2' },
                { no: 2, title: 'FAQ3', contents: '내용3' },
                { no: 1, title: 'FAQ4', contents: '내용4' },
            ],
        };
    }

    pressFaqTab = () => {
        this.setState({
            isOnFaqTab: true,
            isOnEmailTab: false,
        });
    };

    pressEmailTab = () => {
        this.setState({
            isOnFaqTab: false,
            isOnEmailTab: true,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topTab}>
                    <View style={styles.topTab__faqBox}>
                        <TouchableWithoutFeedback style={this.state.isOnFaqTab ? styles['topTab__faqTouchBox--focused'] : styles.topTab__faqTouchBox} onPress={this.pressFaqTab}>
                            <Text style={this.state.isOnFaqTab ? styles['topTab__faqText--focused'] : styles.topTab__faqText}>FAQ</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.topTab__emailBox}>
                        <TouchableWithoutFeedback style={this.state.isOnEmailTab ? styles['topTab__emailTouchBox--focused'] : styles.topTab__emailTouchBox} onPress={this.pressEmailTab}>
                            <Text style={this.state.isOnEmailTab ? styles['topTab__emailText--focused'] : styles.topTab__emailText}>E-mail</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                {this.state.isOnFaqTab ? (
                    <FlatList style={styles.contents__faqList} data={this.state.faqList} renderItem={({ item }) => <FaqComponent faq={item} />} keyExtractor={(item, index) => String(index)} />
                ) : (
                    <View style={styles.contents}>
                        <View style={styles.contents__emailBox}>
                            <Text style={styles.contents__emaiText}>rozeus.service@google.com</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}
