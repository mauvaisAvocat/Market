import react from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  input: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "#1429A3",
    borderWidth: 1,
    marginVertical: 5,
    fontSize: 20,
    color: "#fff",
    borderRadius: 30,
  },
  estiloBoton: {
    marginTop: 30,
    width: "100%",
    paddingLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#C70039",
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowRadius: 20,
    elevation: 5,
  },

  estiloBotonR: {
    marginTop: 20,
    width: "100%",
    paddingLeft: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#1429A3",
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowRadius: 20,
    elevation: 5,
  },
  estiloBotonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },

  imagen: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginVertical: 15,
    borderColor: "#1429A3",
    borderRadius: 200,
  },

  Text: {
    backgroundColor: "#FFF",
    fontSize: 20,
  },
});
