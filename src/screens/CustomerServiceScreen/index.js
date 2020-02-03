import React, { Component } from 'react';
import { Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FlatList } from 'react-navigation';
import { FaqComponent, LoadComponent } from 'components';
import { getFaqList } from 'api/Faq/FaqApi';
import styles from './styles';
import img_email from 'asset/icon/img_email.png';

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
            <SafeAreaView style={styles.container}>
                <View style={styles.topTab}>
                    <View style={styles.topTab__textBox}>
                        <TouchableWithoutFeedback style={isOnFaqTab ? styles['topTab__touchBox--focused'] : styles.topTab__touchBox} onPress={this.pressFaqTab}>
                            <Text style={isOnFaqTab ? styles['topTab__text--focused'] : styles.topTab__text}>FAQ</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.topTab__textBox}>
                        <TouchableWithoutFeedback style={isOnEmailTab ? styles['topTab__touchBox--focused'] : styles.topTab__touchBox} onPress={this.pressEmailTab}>
                            <Text style={isOnEmailTab ? styles['topTab__text--focused'] : styles.topTab__text}>E-mail</Text>
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
                            <ImageBackground style={styles.contents__emailImg} source={img_email}></ImageBackground>
                            <Text style={styles.contents__emaiText}>rozwallet@rozeus.com</Text>
                            <Text style={styles.contents__emaiTextDetail}>Please E-mail Rozeus your question.</Text>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}
