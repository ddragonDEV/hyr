import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import Reportes from '../screens/Reportes/Reportes';
import Saldos from '../screens/Saldos/Saldos';

const Stack = createStackNavigator();

const SaldosStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.fontLight,
				headerStyle: { backgroundColor: colors.bgDark },
				cardStyle: { backgroundColor: colors.bgLight }
			}}
		>
			<Stack.Screen name="saldos" component={Saldos} options={{ title: 'saldos', headerShown: false }} />
		</Stack.Navigator>
	);
};

export default SaldosStack;

const styles = StyleSheet.create({});
