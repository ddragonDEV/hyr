import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import RegisterForm from '../components/Auth/RegisterForm'
import LoginForm from '../components/Auth/LoginForm'

import logo from '../../assets/logo.png'



import { layoutStyle } from '../styles'

const Auth = () => {

    const [showLogin, setShowLogin] = useState(true)

    const changeForm = () => setShowLogin(!showLogin)


    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {
                showLogin ? <LoginForm /> : <RegisterForm changeForm={changeForm} />
            }
            </KeyboardAvoidingView>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({

    logo: {
        width: '100%',
        height: 70,
        resizeMode: 'contain',
        marginBottom: 20
    }
    
})
