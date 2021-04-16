import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import formStyle from "../styles/styles.forms";
import { AntDesign } from "@expo/vector-icons";
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnVisible, setBtnVisible] = useState(true);
  const [aiVisible, setAiVisible] = useState(false);
  const [tiEnabled, setTiEnabled] = useState(true);
  const [user, setUser] = useState([]);
  

  const validaLogin = async () => {
    if (username.length < 10) {
      Alert.alert("ERROR", "Correo incorrecto", [
        {
          text: "Cerrar",
          onPress: () => setUsername(""),
        },
      ]);

      return;
    }

    if (password.length < 8) {
      Alert.alert("ERROR", "Contraseña incorrecta", [
        {
          text: "Cerrar",
          onPress: () => setPassword(""),
        },
      ]);

      return;
    }
    
    const res = await axios.post('https://www.market-app.xyz/api/v1/login', {
          'email': username,
          'password': password,
    });
      const json = await res.data;
      const usuario = [];
      usuario.push(json);
      setUser(usuario);
      console.log(user);

    setBtnVisible(false);
    setAiVisible(true);
    setTiEnabled(false);

    setTimeout(() => {
      setBtnVisible(true);
      setAiVisible(false);
      setTiEnabled(true);
      //Direccionar a Home
      props.navigation.navigate("MenuInicial");
    }, 350);
  };

  return (
    <View style={formStyle.contenedor}>
      <Image
        source={require("./../../assets/images/login.png")}
        style={formStyle.imagen}
      />

      <TextInput
        placeholder='Ingrese correo'
        colorText='#fff'
        keyboardType='email-address'
        style={formStyle.input}
        maxLength={50}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(val) => setUsername(val)}
        value={username}
        editable={tiEnabled}
      />

      <TextInput
        placeholder='Ingrese contraseña'
        keyboardType='default'
        style={formStyle.input}
        minLenght={8}
        maxLength={25}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
        value={password}
        editable={tiEnabled}
      />

      <ActivityIndicator
        color='#000'
        size='large'
        style={{
          marginVertical: 15,
          display: aiVisible ? "flex" : "none",
        }}
      />
      <View
        style={{
          display: btnVisible ? "flex" : "none",
        }}
      >
        <TouchableOpacity style={formStyle.estiloBoton} onPress={validaLogin}>
          <Text style={formStyle.estiloBotonText}>
            <AntDesign size={22} name='login' />
            {"  "}
            Iniciar de sesión
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={formStyle.estiloBotonR}
        onPress={() => {
          props.navigation.navigate("Registro");
        }}
      >
        <Text style={formStyle.estiloBotonText}>
          <AntDesign size={22} name='adduser' />
          {"  "}
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
