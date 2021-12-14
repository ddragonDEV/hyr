import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import StatusBarCustom from '../../components/StatusBar'
import colors from '../../styles/colors'
import * as Linking from 'expo-linking'
import * as FileSystem from 'expo-file-system'



const Reportes = () => {


    downloadUsers = () => {
        
    }




    const [items, setItems] = React.useState([
        { name: 'USUARIOS', code: '#FE9100', url: 'http://dev.love.cl:13000/api/users', describe: 'Listado de administradores y operarios en la APP' },
        { name: 'ORDENES DE TRABAJO', code: '#000029', url: 'http://dev.love.cl:13000/api/ots', describe: 'Listado de todas las OT' },
        { name: 'SALDOS PENDIENTES', code: '#000029', url: 'http://dev.love.cl:13000/api/saldos', describe: 'Listado de los saldos pendientes' },
        { name: 'EMPRESAS', code: '#FE9100', url: 'http://dev.love.cl:13000/api/empresas', describe: 'Listado de las empresas' },
        { name: 'OPERARIOS', code: '#FE9100', url: 'http://dev.love.cl:13000/api/operarios', describe: 'Listado de los operarios que han generado OT' },
        { name: 'TODO', code: '#000029', url: 'http://dev.love.cl:13000/api/ots', describe: 'Toda la información de la APP' },

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
            </Text>
        </View>
        <View style={styles.container}>
        <FlatGrid
      itemDimension={150}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity   onPress={ () => Linking.openURL(item.url) } style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.describe}</Text>
        </TouchableOpacity >
      )}
    />
        </View>
        </>
	);
};

export default Reportes;


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

