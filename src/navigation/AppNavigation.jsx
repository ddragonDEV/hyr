import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import AccountStack from '../navigation/AccountStack';
import OperarioStack from '../navigation/OperarioStack';
import OrdenesStack from '../navigation/OrdenesStack';
import {getMeApi} from '../api/user'
import useAuth from '../hooks/useAuth'

import Home from '../screens/Home';
import HomeOperador from '../screens/HomeOperador';
import ReportsStack from './ReportsStack';
import SaldosStack from './SaldosStack';

const Tab = createMaterialBottomTabNavigator();

const AppNavigation = () => {


	const [rol, setRol] = useState(null)
    const [user, setUser] = useState(null)
    const { auth } = useAuth()

        useEffect(() => {
            (async () => {
                const response = await getMeApi(auth.token)
                setUser(response)
				setRol(response.rol)
            })()
        }, [])
    
	

	return (
		<NavigationContainer>
			<Tab.Navigator
				activeColor="#FE9100"
				inactiveColor="#000029"
				barStyle={styles.navigation}
				screenOptions={({ route }) => ({
					tabBarIcon: (routeStatus) => {
						return setIcon(route, routeStatus);
					}
				})}
			>
				{
					rol == 'Administrador' ? (
						<>
				<Tab.Screen
					name="home"
					component={Home}
					options={{
						tabBarLabel: 'Inicio',
						tabBarIcon: ({ color }) => <AwesomeIcon name="home" color={color} size={22} />
					}}
				/>
				<Tab.Screen
					name="operario"
					component={OperarioStack}
					options={{
						tabBarLabel: 'Operarios',
						tabBarIcon: ({ color }) => <AwesomeIcon name="user-plus" color={color} size={22} />
					}}
				/>
				<Tab.Screen
					name="ordenes"
					component={OrdenesStack}
					options={{
						tabBarLabel: 'Ordenes',
						tabBarIcon: ({ color }) => <AwesomeIcon name="list-alt" color={color} size={22} />
					}}
				/>
				<Tab.Screen
					name="reports"
					component={ReportsStack}
					options={{
						tabBarLabel: 'Reportes',
						tabBarIcon: ({ color }) => <AwesomeIcon name="line-chart" color={color} size={22} />
					}}
				/>
				<Tab.Screen
					name="saldos"
					component={SaldosStack}
					options={{
						tabBarLabel: 'Saldos',
						tabBarIcon: ({ color }) => <AwesomeIcon name="credit-card" color={color} size={22} />
					}}
				/>
				<Tab.Screen
					name="profile"
					component={AccountStack}
					options={{
						tabBarLabel: 'Perfil',
						tabBarIcon: ({ color }) => <AwesomeIcon name="user-circle" color={color} size={22} />
					}}
				/>
					</>
					) : (	
						<>					
					<Tab.Screen
						name="home"
						component={HomeOperador}
						options={{
							tabBarLabel: 'Inicio',
							tabBarIcon: ({ color }) => <AwesomeIcon name="home" color={color} size={22} />
						}}
					/>

								<Tab.Screen
					name="ordenes"
					component={OrdenesStack}
					options={{
						tabBarLabel: 'Ordenes',
						tabBarIcon: ({ color }) => <AwesomeIcon name="list-alt" color={color} size={22} />
					}}
				/>
									<Tab.Screen
					name="profile"
					component={AccountStack}
					options={{
						tabBarLabel: 'Perfil',
						tabBarIcon: ({ color }) => <AwesomeIcon name="user-circle" color={color} size={22} />
					}}
				/>
					
					
					</>
					)
				}

				
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;

function setIcon(route, routeStatus) {
	let iconName = '';

	switch (route.name) {
		case 'home':
			iconName = 'home';
			break;
		case 'profile':
			iconName = 'user-circle';
			break;
		case 'operario':
			iconName = 'user-plus';
			break;
		case 'ordenes':
			iconName = 'list-alt';
			break;
		default:
			break;
	}

	return <AwesomeIcon name={iconName} style={styles.icon} />;
}

const styles = StyleSheet.create({
	navigation: {
		backgroundColor: '#FFFFFF',
		borderTopColor: 'rgba(0, 0, 0, 0.3)',
		borderTopWidth: 1
	},
	icon: {
		fontSize: 20,
		color: colors.primary
	}
});
