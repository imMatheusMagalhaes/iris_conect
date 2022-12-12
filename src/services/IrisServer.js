import easyDB from 'easy-db-react-native';
import {Alert} from 'react-native';
import TcpSocket from 'react-native-tcp-socket';
const {update} = easyDB();

export const initIrisServer = ({port, host}, dispatch) => {
  const saveImage = async (data, socket) => {
    socket.write('Echo server ' + data);
    try {
      const image = JSON.parse(JSON.parse(data.toString()));
      await update('images', image.id, image.src);
      Alert.alert('New Image received', '');
    } catch (error) {
      Alert.alert('New Image error', error.toString());
    }
  };

  const server = TcpSocket.createServer(socket => {
    socket.write('[CONNECTION ESTABLISHED]\n');

    dispatch({type: 'SET_CLIENT_STATUS', payload: true});

    socket.on('data', data => saveImage(data, socket).then());

    socket.on('error', error => {
      console.log('An error ocurred with client socket ', error);
      dispatch({type: 'SET_CLIENT_STATUS', payload: false});
    });

    socket.on('close', error => {
      dispatch({type: 'SET_CLIENT_STATUS', payload: false});
      console.log('Closed connection with ', socket.address());
    });
  });

  server.on('error', error => {
    console.log('An error ocurred with the server', error);
    dispatch({type: 'SET_SERVER_STATUS', payload: false});
  });

  server.on('close', () => {
    console.log('Server closed connection');
    dispatch({type: 'SET_SERVER_STATUS', payload: false});
  });

  server.listen({port, host, reuseAddress: true}, () => {
    console.log(`[SERVER LISTENING]: ${server.listening}`);
    dispatch({type: 'SET_SERVER_STATUS', payload: true});
  });

  return server;
};
