import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

/*Librerías de ubicación en tiempo real*/
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/core";

const Lugares = [
  {
    nombre: "MI TIENDITA",
    direccion: "101 Arco del Triunfo\nC.P. 76148, Querétaro\n Qro. México",
    ubicacion: {
      latitud: 20.6460549,
      longitude: -100.4105675,
    },
  },
];

const Lugar = (props) => {
  const [mostrarUbic, setMostrarUbic] = useState(false);
  const [mapa, setMapa] = useState(null);

    useFocusEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            title: 'Localización',
        });
  });

  const getUbicacion = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setLatUser(location.coords.latitude);
        setLonUser(location.coords.longitude);

        setMostrarUbic(true);
        mapa.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          5000
        );
      } else {
        Alert.alert("ERROR", "Se necesita permiso de ubicación para continuar");
      }
    } catch (e) {
      console.log(e.toString());
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={getUbicacion}
        style={{
          flex: 1,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons name='location-searching' size={30} color='#fff' />
      </TouchableOpacity>
      <MapView
        showsUserLocation
        followsUserLocation
        ref={(map) => setMapa(map)}
        initialRegion={{
          latitude: 20.653041,
          longitude: -100.4039686,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={{ flex: 11 }}
      >
        {Lugares.map((m, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: m.ubicacion.latitud,
              longitude: m.ubicacion.longitude,
            }}
          >
            <Callout>
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 15,
                  }}
                >
                  {m.nombre}
                </Text>
                <Text>{m.direccion}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {mostrarUbic && (
          <Marker
            coordinate={{
              latitude: latUser,
              longitude: lonUser,
            }}
          >
            <Callout>
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 15,
                  }}
                >
                  <MaterialIcons name='my-location' size={18} color='#000' /> Mi
                  ubicación
                </Text>
                <Text>{direccionUser}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </SafeAreaView>
  );
};

export default Lugar;
