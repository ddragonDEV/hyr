import React, { useState, useCallback } from 'react'
import {  useFocusEffect  } from '@react-navigation/native'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Search from '../../components/Search/' 
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import useAuth from '../../hooks/useAuth'
import ScreenLoading from '../../components/ScreenLoading'
import UserInfo from '../../components/Account/UserInfo'
import {getMeApi} from '../../api/user'
import Menu from '../../components/Menu'



const Perfil = () => {

    const [user, setUser] = useState(null)
    const { auth } = useAuth()


    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token)
                setUser(response)
            })()
        }, [])
    )
       


    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
        {
            !user ? (<ScreenLoading size="large" text="Cargando...." />) : 
            (
            <>
        <ScrollView >
            <UserInfo user={user}/>
            <Menu />
        </ScrollView>
            
            </>
            )
        }

        </>
    )
}

export default Perfil

