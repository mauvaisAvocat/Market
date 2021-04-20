import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import { FlatList, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Market from '../../components/Market';
import stylesForms from '../../styles/styles.forms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Markets = (props) => {

    const [markets, setMarkets] = useState([]);
    const [code, setCode] = useState('');
    const [tiEnabled, setTiEnabled] = useState(true);
    const [email, setEmail] = useState('');
    

    useFocusEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            title: 'Markets',
        });
    });

    useEffect(() => {
        getMarkets();
    }, []);

    const getEmailStorage = async () => {
        try {
            const result = await AsyncStorage.getItem('@user.email');
            setEmail(result);
        } catch (e) {
            console.log(e);
        }
    };

    getEmailStorage();

    const getMarkets = async () => {
        try {
            const res = await axios.get(`https://www.market-app.xyz/api/v1/markets/${email}`);
            const json = await res.data;
            const arrayMarkets = [];
            json.map((market) => {
                arrayMarkets.push(market);
            });
            setMarkets(arrayMarkets);
            console.log(markets[0]);
        } catch (e) {
            console.log(e);
        }
    };
    
    const searchMarket = async () => {
        try {
            const res = await axios.get('https://www.market-app.xyz/api/v1/employees/store/56abd7df?uid=1');
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesForms.contenedor}>
                <TextInput
                    placeHolder='Ingresa código del market*'
                    colorText='#fff'
                    placeholderTextColor= '#fff'
                    keyboardType='default'
                    style={stylesForms.input}
                    maxLength={50}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(val) => setCode(val)}
                    value={code}
                    editable={tiEnabled}
                />
                <TouchableOpacity
                    style={{ ...stylesForms.estiloBoton, marginTop: 15, }}
                    onPress={ searchMarket }
                >
                    <Text style={stylesForms.estiloBotonText}>
                        Ingresar
                    </Text>

                </TouchableOpacity>
                <FlatList
                    style={{
                        marginVertical: 10,
                        marginHorizontal: 10,
                    }}
                    data={markets}
                    renderItem={(item) => (
                        <Market datosMarket={item.item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
     );
}
 
export default Markets;