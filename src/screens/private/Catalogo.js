import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import Producto from '../../components/Producto';

const Catologo = (props) => {

    const [producto, setProducto] = useState([]);

    useFocusEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            title: 'Catálogo',
        });
    });

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const response = await axios.get('https://www.market-app.xyz/api/v1/products?market=1');
            const json = await response.data;
            const arrayProductos = [];
            json.map((product) => {
                arrayProductos.push(product);
            });
            console.log(producto);
            setProducto(arrayProductos);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <FlatList
                style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                }}
                data={producto}
                renderItem={(item) => (
                    <Producto datosProducto={item.item} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
     );
}
 
export default Catologo;