import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import stylesForms from '../styles/styles.forms';

const Producto = ({datosProducto}) => {

    const {
        id,
        name,
        brand,
        barcode,
        type,
        price,
        cost,
        image,
    } = datosProducto;
    return (
        <TouchableOpacity>

            <View
                style={{
                    flex: 1,
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginBottom: 15,
                    shadowColor: '#535353',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 2,
                 }}
            >

                <View style={{ flexDirection: 'row' }}>

                    <View
                        style={{
                            flex: 3,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                         }}
                    >
                        <ImageBackground
                            source={{ uri: image }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                overflow: 'hidden',
                             }}
                        />

                    </View>

                    <View
                        style={{
                            flex: 7,
                            justifyContent: 'center',
                         }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '500',
                             }}
                        >
                            {id}
                            {'  '}
                            {name}
                        </Text>

                        <Text
                            style={{
                                marginTop: 5,
                                color: '#535353',
                             }}
                        >
                            {price}
                        </Text>

                    </View>

                </View>

            </View>

        </TouchableOpacity>
     );
}
 
export default Producto;