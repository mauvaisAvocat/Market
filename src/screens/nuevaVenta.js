import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import { Text, View, Button } from "react-native";
import stylesForms from "./../styles/styles.forms";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const NuevaVenta = (props) => {
  useFocusEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      title: "Nueva Venta",
    });
  });

  const tomarFotoCamara = async () => {
    const permisoCamara = await Permissions.askAsync(Permissions.CAMERA);

    const permisoGaleria = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    if (
      permisoCamara.status === "granted" &&
      permisoGaleria.status === "granted"
    ) {
      const imgCamara = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
    } else {
      Alert.alert("ERROR", "Faltan permisos para continuar");
    }
  };

  return (
    <View
      style={{
        ...stylesForms.contenedor,
        marginVertical: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "500",
          fontSize: 20,
          textAlign: "center",
          alignSelf: "center",
          marginVertical: 20,
          color: "#fff",
        }}
      >
        Comenzar una venta
      </Text>

      <Button title='Nueva venta' color='#C70039' onPress={tomarFotoCamara} />
    </View>
  );
};

export default NuevaVenta;
