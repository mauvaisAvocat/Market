import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import { Text, View, Button } from "react-native";
import stylesForms from "./../styles/styles.forms";

const NuevaVenta = (props) => {
  useFocusEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      title: "Nueva Venta",
    });
  });

  return (
    <View
      style={{
        ...stylesForms.contenedor,
        marginVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontWeight: '500',
          fontSize: 20,
          textAlign: 'center',
          alignSelf: 'center',
          marginVertical: 20,
          color: '#fff',
        }}
      >
        Comenzar una venta!
      </Text>

      <Button title='Nueva venta' color='#C70039' />
    </View>
  );
};

export default NuevaVenta;
