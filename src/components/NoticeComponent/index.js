import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default class NoticeComponent extends Component {
	static defaultProps = {
		notice: {
			no: 1,
			title: '',
			inDt: new Date(),
		},
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleBox}>
					<Text style={styles.title}>{this.props.notice.title}</Text>
					<Text style={styles.inDt}>{this.props.notice.inDt}</Text>
				</View>
				<View style={styles.btnBox}></View>
			</View>
		);
	}
}
