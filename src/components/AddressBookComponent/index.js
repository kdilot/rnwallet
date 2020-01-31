/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { Text, View, TextInput, TouchableOpacity, Clipboard } from 'react-native';
import CardView from 'react-native-cardview';
import Feather from 'react-native-vector-icons/Feather';
import { dividerLightColor, dividerDarkColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

import * as addressBookApi from 'api/AddressBook/AddressBookApi';

class AddressBookComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nickname: props.nickname,
			address: props.address,
		};
	}

	onChange = text => {
		this.setState({ nickname: text });
	};

	onSend = () => {
		const { AddressAction, address, toast } = this.props;
		const { lang } = this.props.navigation.getScreenProps('locale');
		const { nickname } = this.state;

		addressBookApi.setAddressBookApi({ address, nickname }).then(addressBookMap => {
			if (!addressBookMap || addressBookMap === {}) {
				return;
			}

			AddressAction.setAddressBook(addressBookMap);
			toast.showToast(lang.saveMsg);
		});
	};

	onHistory = () => {
		const { address } = this.props;
		this.props.navigation.navigate('WalletHistory', { itemType: 3, address });
	};

	onCopy = text => {
		const { toast } = this.props;
		const { lang } = this.props.navigation.getScreenProps('locale');
		Clipboard.setString(text);
		toast.showToast(lang.copy);
	};

	render() {
		const { address, nickname } = this.state;
		const { lang } = this.props.navigation.getScreenProps('locale');
		return (
			<View style={styles.container}>
				<CardView cardElevation={5} cornerRadius={0} style={styles.cardLayout}>
					<View style={styles.textLayout}>
						<View style={[styles.textInputLayout, styles.borderColor(dividerLightColor)]}>
							{nickname ? (
								<TextInput value={nickname} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
							) : (
								<TextInput placeholder="nickname" keyboardType={'default'} onChangeText={text => this.onChange(text)} />
							)}
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Text style={styles.addressTextStyle} numberOfLines={1} ellipsizeMode="middle">
								{address}
							</Text>
							<TouchableOpacity
								style={[styles.addressTextStyle, styles.addressCopyStyle]}
								onPress={() => {
									this.onCopy(address);
								}}>
								<Feather name="copy" size={20} />
							</TouchableOpacity>
						</View>
						<TouchableOpacity style={styles.historyButtonLayout} onPress={() => this.onHistory()}>
							<Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor)]}>{lang.walletHistory}</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={[styles.sendButtonLayout, styles.borderColor(dividerLightColor)]} onPress={() => this.onSend()}>
						<Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor), { textAlign: 'right' }]}>{lang.save}</Text>
					</TouchableOpacity>
				</CardView>
			</View>
		);
	}
}

AddressBookComponent.propTypes = {
	address: PropTypes.string,
	nickname: PropTypes.string,
	onChange: PropTypes.func,
	onSend: PropTypes.func,
	onHistory: PropTypes.func,
	onCopy: PropTypes.func,
};

export default connect(
	state => ({}),
	dispatch => ({
		AddressAction: bindActionCreators(addressActions, dispatch),
	}),
)(AddressBookComponent);
