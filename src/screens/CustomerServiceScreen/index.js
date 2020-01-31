import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FlatList } from 'react-navigation';
import { FaqComponent, LoadComponent } from 'components';
import { getFaqList } from 'api/Faq/FaqApi';
import styles from './styles';

export default class CustomerServiceScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOnFaqTab: true,
            isOnEmailTab: false,
            isLoad: false,
            faqList: [],
        };
    }

    componentDidMount() {
        this.getFaqList();
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

    getFaqList = async () => {
        let faqList = await getFaqList();
        this.setState({ faqList: faqList, isLoad: true });
    };

    render() {
        const { faqList, isOnFaqTab, isOnEmailTab, isLoad } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.topTab}>
                    <View style={styles.topTab__faqBox}>
                        <TouchableWithoutFeedback style={isOnFaqTab ? styles['topTab__faqTouchBox--focused'] : styles.topTab__faqTouchBox} onPress={this.pressFaqTab}>
                            <Text style={isOnFaqTab ? styles['topTab__faqText--focused'] : styles.topTab__faqText}>FAQ</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.topTab__emailBox}>
                        <TouchableWithoutFeedback style={isOnEmailTab ? styles['topTab__emailTouchBox--focused'] : styles.topTab__emailTouchBox} onPress={this.pressEmailTab}>
                            <Text style={isOnEmailTab ? styles['topTab__emailText--focused'] : styles.topTab__emailText}>E-mail</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                {isOnFaqTab ? (
                    faqList.length > 0 ? (
                        <FlatList style={styles.contents__faqList} data={faqList} renderItem={({ item }) => <FaqComponent faq={item} />} keyExtractor={(item, index) => String(index)} />
                    ) : (
                        <LoadComponent isLoad={isLoad} />
                    )
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
