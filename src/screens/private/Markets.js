import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import { FlatList, TextInput, View } from 'react-native';
import Market from '../../components/Market';
import stylesForms from '../../styles/styles.forms';

const Markets = (props) => {

    const [markets, setMarkets] = useState([]);
    const [code, setCode] = useState('');
    const [tiEnabled, setTiEnabled] = useState(true);

    useFocusEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            title: 'Markets',
        });
    });

    useEffect(() => {
        getMarkets();
    }, []);

    const getMarkets = async () => {
        try {
            const res = await axios.get('https://www.market-app.xyz/api/v1/markets/jamahcs@outlook.com');
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