import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/screens/Login";
import MenuInicial from "./src/screens/menuInicial";
import Registro from "./src/screens/Registro";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='MenuInicial' component={MenuInicial} />
        <Stack.Screen name='Registro' component={Registro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
