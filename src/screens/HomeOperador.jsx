import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Details from '../components/Details'
import StatusBarCustom from '../components/StatusBar'
import colors from '../styles/colors'
import { FlatGrid } from 'react-native-super-grid';

import { useNavigation } from '@react-navigation/native';


const HomeOperador = () => {

    const navigation = useNavigation();


    const [items, setItems] = React.useState([
        { name: 'ADMINISTRAR OT', code: '#FE9100', navigate: 'ordenes', describe: 'Crear y editar Ordenes de trabajo' },
        { name: 'PERFIL', code: '#000029', navigate: 'profile', describe: 'Modificar correo, contraseña, nombres' }
      ]);




    return (
        <>
        <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content"/>
        <View style={{ 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20}}>
            <Text>
                Bienvenido a HYR
            </Text>
        </View>
        <View style={styles.container}>
        <FlatGrid
      itemDimension={300}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity   onPress={ () => navigation.navigate(item.navigate) } style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.describe}</Text>
        </TouchableOpacity >
      )}
    />
        </View>
        </>
    )
}

export default HomeOperador

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20

      },
      fixedRatio: {
        backgroundColor: 'rebeccapurple',
        flex: 1,
        aspectRatio: 16 / 6,
        borderRadius: 20
      },
      title: {
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          display: 'flex',
          fontSize: 20
      },
      gridView: {
        marginTop: 10,
        flex: 1,
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
      itemCode: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
      },
    
})
