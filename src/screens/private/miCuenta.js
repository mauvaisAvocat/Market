import { useFocusEffect } from "@react-navigation/core";
import formStyle from "../../styles/styles.forms";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
const MiCuenta = (props) => {
  //Titulo del screen en foco
  useFocusEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      title: "Mi cuenta",
    });
  });

  return (
    <View style={formStyle.contenedor}>
      <ScrollView>
        <TouchableOpacity>
          <ImageBackground
            source={require("./../../../assets/images/determinado.png")}
            style={formStyle.imagen}
          >
            <Text
              style={{
                backgroundColor: "#000",
                color: "#fff",
                width: "100%",
                paddingBottom: 20,
                paddingTop: 10,
                opacity: 0.8,
                textAlign: "center",
                position: "absolute",
                bottom: 1,
              }}
            >
              <FontAwesome5 name='camera' size={16} color='#fff' /> Cambiar
              imagen
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TextInput style={formStyle.input} value={"Verónica"} />
        <TextInput style={formStyle.input} value={"Lorenzo"} />
        <TextInput style={formStyle.input} value={"Alavez"} />
        <TextInput
          style={formStyle.input}
          value={"veronicalorenzo1999@gmail.com"}
        />
        <TextInput style={formStyle.input} value={"4424695054"} />
        <TextInput style={formStyle.input} value={"veronica12345"} />
        <TouchableOpacity style={formStyle.estiloBoton}>
          <Text style={formStyle.estiloBotonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MiCuenta;
