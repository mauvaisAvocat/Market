import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

const Market = ({ datosMarket }) => {
    
    const {
        id,
        uuid,
        name,
        logo,
        created_at,
        updated_at,
        role,
        type,
        relation_id
    } = datosMarket;

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
                            source={{ uri: logo }}
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
                            {name}

                        </Text>

                        <Text
                            style={{
                                marginTop: 15,
                                color: '#535353',
                             }}
                        >
                            {role}

                        </Text>

                        <Text
                            style={{
                                marginTop: 15,
                                color: '#535353',
                             }}
                        >
                            {type}

                        </Text>
                        
                    </View>

                 </View>

            </View>

        </TouchableOpacity>
     );
}
 
export default Market;