import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAddressesApi } from '../../api/address';
import { getAllOperators } from '../../api/user';
import { getOrdersApi } from '../../api/orders';

import useAuth from '../../hooks/useAuth';
import { size } from 'lodash';

import colors from '../../styles/colors';
import OrdenesList from '../../components/Ordenes/OrdenesList';

const Ordenes = () => {
	const { auth } = useAuth();
	const [ users, setUsers ] = useState(null);
	const [ reloadAddress, setReloadAddress ] = useState(false);
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(
			() => {
				setUsers(null);
				(async () => {
					const response = await getOrdersApi(auth);
					setUsers(response);
					//console.log('respuesta', response);
					setReloadAddress(false);
				})();
			},
			[ reloadAddress ]
		)
	);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Ordenes</Text>
			<TouchableWithoutFeedback onPress={() => navigation.navigate('add-ordenes')}>
				<View style={styles.addAddress}>
					<Text style={styles.addAddressText}>Crear una OT</Text>
					<IconButton icon="arrow-right" color={colors.bgDark} size={19} />
				</View>
			</TouchableWithoutFeedback>

			<TouchableWithoutFeedback onPress={() => navigation.navigate('add-empresa')}>
				<View style={styles.addAddress}>
					<Text style={styles.addAddressText}>Agregar una Empresa</Text>
					<IconButton icon="plus-circle" color={colors.bgDark} size={19} />
				</View>
			</TouchableWithoutFeedback>
			{!users ? (
				<ActivityIndicator size="large" style={styles.loading} color={colors.primary} />
			) : size(users) === 0 ? (
				<Text style={styles.noAddressText}>Añade tu primera OT</Text>
			) : (
				<OrdenesList users={users} setReloadAddress={setReloadAddress} />
			)}
		</ScrollView>
	);
};

export default Ordenes;

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
