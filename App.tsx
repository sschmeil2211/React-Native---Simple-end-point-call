import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TouchableOpacity, Text, View, Modal, StyleSheet } from 'react-native';

function App(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.post('https://us-central1-paneles-solares-ungs.cloudfunctions.net/insertFictitiousData');
      console.log('Response:', response.data);
      setIsLoading(false);
      setHasError(false);
      setVisible(true);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        console.error('General Error:', error);
      }
    }
  };

  const handleAxiosError = (error: AxiosError<unknown>) => {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
    } else {
      console.error('Error Message:', error.message);
    }
  }; 
  
  const buttonStyles = {...styles.buttonText, backgroundColor: isLoading ? "grey": "#87480C" };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSubmit} disabled={isLoading} style={styles.button}>
        <Text style={buttonStyles}>
          {isLoading ? 'Cargando' : 'GENERAR'}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {hasError ? 'Hubo un error' : 'Generado correctamente'}
            </Text>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11323B',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 30,
    justifyContent: 'flex-end',
    height: '100%',
  },
  buttonText: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderRadius: 15,
    backgroundColor: '#87480C',
    paddingHorizontal: 50,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 30,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 30,
    backgroundColor: '#3B2511',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;