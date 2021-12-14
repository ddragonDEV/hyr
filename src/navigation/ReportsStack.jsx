import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Operario from '../screens/Operarios/Operarios';

import colors from '../styles/colors';
import Reportes from '../screens/Reportes/Reportes';

const Stack = createStackNavigator();

const ReportsStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.fontLight,
				headerStyle: { backgroundColor: colors.bgDark },
				cardStyle: { backgroundColor: colors.bgLight }
			}}
		>
			<Stack.Screen name="reports" component={Reportes} options={{ title: 'reporte', headerShown: false }} />
		</Stack.Navigator>
	);
};

export default ReportsStack;

const styles = StyleSheet.create({});
