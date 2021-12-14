import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Operario from '../screens/Operarios/Operarios';
import AddOperario from '../screens/Operarios/AddOperario';

import Ordenes from '../screens/Ordenes/Ordenes';
import AddEmpresa from '../screens/Ordenes/AddEmpresa'
import AddOrden from '../screens/Ordenes/AddOrden'


import colors from '../styles/colors';

const Stack = createStackNavigator();

const OrdenesStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.fontLight,
				headerStyle: { backgroundColor: colors.bgDark },
				cardStyle: { backgroundColor: colors.bgLight }
			}}
		>
			<Stack.Screen 
				name="ordenes" 
				component={Ordenes} 
				options={{ 
					title: 'ordenes'
				 }}
		    />
						<Stack.Screen 
				name="add-ordenes" 
				component={AddOrden} 
				options={{ 
					title: 'Crear Orden de Trabajo'
				 }}
		    />

			<Stack.Screen
                name="add-empresa"
                component={AddEmpresa}
                options={{
                    title: "Nueva Empresa"
                }}

            /> 
		</Stack.Navigator>
	);
};

export default OrdenesStack;

const styles = StyleSheet.create({});
