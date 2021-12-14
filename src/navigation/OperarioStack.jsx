import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Operario from '../screens/Operarios/Operarios'
import AddOperario from '../screens/Operarios/AddOperario'


import colors from '../styles/colors'

const Stack = createStackNavigator()

const OperarioStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
                cardStyle: {  backgroundColor: colors.bgLight  }
            }}
        >
            <Stack.Screen
                name="operario"
                component={Operario}
                options={{ title: 'operario', headerShown: false }}
            />
            
            <Stack.Screen
                name="add-operario"
                component={AddOperario}
                options={{
                    title: "Nuevo Operario"
                }}

            /> 

        </Stack.Navigator>
    )
}

export default OperarioStack

const styles = StyleSheet.create({})
