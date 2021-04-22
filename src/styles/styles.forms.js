import react from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f3f4f6',
  },
  input: {
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginVertical: 5,
    fontSize: 20,
    color: '#000',
    borderRadius: 30,
    marginHorizontal: '5%',
  },
  estiloBoton: {
    marginTop: 30,
    width: '90%',
    paddingLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#1f2937',
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowRadius: 20,
    elevation: 5,
    marginHorizontal: '5%',
  },

  estiloBotonR: {
    marginTop: 20,
    width: '90%',
    paddingLeft: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#1f2937',
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowRadius: 20,
    elevation: 5,
    marginHorizontal: '5%',
  },
  estiloBotonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },

  imagen: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginVertical: 15,
    borderColor: '#1429A3',
    borderRadius: 200,
  },

  Text: {
    backgroundColor: '#FFF',
    fontSize: 20,
  },
});
