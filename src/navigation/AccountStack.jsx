import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Perfil from '../screens/Perfil/Perfil'
import ChangeName from '../screens/Perfil/ChangeName'
import ChangeEmail from '../screens/Perfil/ChangeEmail'
import ChangeUsername from '../screens/Perfil/ChangeUsername'
import ChangePassword from '../screens/Perfil/ChangePassword'
import Addresses from '../screens/Perfil/Addresses'
import AddAddresses from '../screens/Perfil/AddAddress'

import colors from '../styles/colors'
import AddAddress from '../screens/Perfil/AddAddress'

const Stack = createStackNavigator()

const AccountStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
                cardStyle: {  backgroundColor: colors.bgLight  }
            }}
        >
            <Stack.Screen
                name="profile"
                component={Perfil}
                options={{ title: 'perfil', headerShown: false }}
            />
            <Stack.Screen
                name="change-name"
                component={ChangeName}
                options={{
                    title: "Cambiar nombres y apellidos"
                }}

            /> 
            <Stack.Screen
                name="change-email"
                component={ChangeEmail}
                options={{
                    title: "Cambiar Email"
                }}

            /> 
            <Stack.Screen
                name="change-username"
                component={ChangeUsername}
                options={{
                    title: "Cambiar Nombre de usuario"
                }}

            /> 
            <Stack.Screen
                name="change-password"
                component={ChangePassword}
                options={{
                    title: "Cambiar Contraseña"
                }}

            /> 
            <Stack.Screen
                name="adresses"
                component={Addresses}
                options={{
                    title: "Mis Direcciones"
                }}

            /> 
                        <Stack.Screen
                name="add-adresses"
                component={AddAddress}
                options={{
                    title: "Nueva dirección"
                }}

            /> 
        </Stack.Navigator>
    )
}

export default AccountStack

const styles = StyleSheet.create({})
