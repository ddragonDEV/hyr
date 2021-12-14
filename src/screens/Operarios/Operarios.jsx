import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAddressesApi } from '../../api/address';
import { getAllOperators } from '../../api/user';

import useAuth from '../../hooks/useAuth';
import { size } from 'lodash';

import colors from '../../styles/colors';
import OperarioList from '../../components/Operario/OperarioList';

const Operarios = () => {
	const { auth } = useAuth();
	const [ users, setUsers ] = useState(null);
	const [ reloadAddress, setReloadAddress ] = useState(false);
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(
			() => {
				setUsers(null);
				(async () => {
					const response = await getAllOperators();
					setUsers(response);
					setReloadAddress(false);
				})();
			},
			[ reloadAddress ]
		)
	);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Operarios</Text>
			<TouchableWithoutFeedback onPress={() => navigation.navigate('add-operario')}>
				<View style={styles.addAddress}>
					<Text style={styles.addAddressText}>Añadir UN OPERARIO</Text>
					<IconButton icon="arrow-right" color={colors.bgDark} size={19} />
				</View>
			</TouchableWithoutFeedback>
			{!users ? (
				<ActivityIndicator size="large" style={styles.loading} color={colors.primary} />
			) : size(users) === 0 ? (
				<Text style={styles.noAddressText}>Añade tu primer operario</Text>
			) : (
				<OperarioList users={users} setReloadAddress={setReloadAddress} />
			)}
		</ScrollView>
	);
};

export default Operarios;

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	title: {
		fontSize: 20
	},
	addAddress: {
		borderWidth: 0.9,
		borderRadius: 5,
		borderColor: '#ddd',
		paddingHorizontal: 15,
		paddingVertical: 5,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.primary
	},
	addAddressText: {
		fontSize: 16,
		color: colors.bgDark,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	loading: {
		marginTop: 20
	},
	noAddressText: {
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center'
	}
});
