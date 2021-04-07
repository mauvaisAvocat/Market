import { useFocusEffect } from "@react-navigation/core";
import formStyle from "../../styles/styles.forms";
import React, {useState} from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import AppModal from "./AppModal";
const MiCuenta = (props) => {

    const [modalImg, setModalImg] = useState(false);
  //Titulo del screen en foco
  useFocusEffect(() => {
    props.navigation.dangerouslyGetParent().setOptions({
      title: "Mi cuenta",
    });
  });

  return (
    <View style={formStyle.contenedor}>
      {modalImg ? (
        <AppModal
          show={modalImg}
          layerBgColor='#333'
          layerBgOpacity={0.5}
          modalBgColor='#fff'
          modalOpacity={1}
          modalContent={
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  marginVertical: 10,
                  fontSize: 20,
                  fontWeight: '500',
                }}
              >
                <FontAwesome5 name='camera-retro' size={20} /> Actualizar imagen
                de perfíl
              </Text>

              <Button title='Tomar foto' />

              <View
                style={{
                  marginVertical: 5,
                }}
              />

              <Button title='Galería' onPress={tomarImagenGaleria} />

              <View
                style={{
                  marginVertical: 5,
                }}
              />

              <Button
                title='Cancelar'
                color='red'
                onPress={() => setModalImg(false)}
              />
            </View>
          }
        />
      ) : null}
      <ScrollView>
        <TouchableOpacity onPress={() => setModalImg(true)}>
          <ImageBackground
            source={require('./../../../assets/images/determinado.png')}
            style={formStyle.imagen}
          >
            <Text
              style={{
                backgroundColor: '#000',
                color: '#fff',
                width: '100%',
                paddingBottom: 20,
                paddingTop: 10,
                opacity: 0.8,
                textAlign: 'center',
                position: 'absolute',
                bottom: 1,
              }}
            >
              <FontAwesome5 name='camera' size={16} color='#fff' /> Cambiar
              imagen
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TextInput style={formStyle.input} value={'Verónica'} />
        <TextInput style={formStyle.input} value={'Lorenzo'} />
        <TextInput style={formStyle.input} value={'Alavez'} />
        <TextInput
          style={formStyle.input}
          value={'veronicalorenzo1999@gmail.com'}
        />
        <TextInput style={formStyle.input} value={'4424695054'} />
        <TextInput style={formStyle.input} value={'veronica12345'} />
        <TouchableOpacity style={formStyle.estiloBoton}>
          <Text style={formStyle.estiloBotonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MiCuenta;
