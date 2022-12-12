import {refresh, useNetInfo} from '@react-native-community/netinfo';
import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {defaultListen} from '../../App';
import {IrisContext} from '../store/contexts/irisContext';

export default function ConectionStatus() {
  const [state, dispatch] = useContext(IrisContext);
  const {details} = useNetInfo();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontSize: 18}}>Server Status:</Text>
      <Text
        style={{
          color: state.listening ? 'green' : 'red',
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        {state.listening ? 'ON' : 'OFF'}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>Device IP Address:</Text>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
        {details?.ipAddress || (
          <Text style={{color: 'black', fontStyle: 'italic'}}>Not found</Text>
        )}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>Listening on:</Text>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 24}}>
        {defaultListen.port || (
          <Text style={{color: 'black', fontStyle: 'italic'}}>Not found</Text>
        )}
      </Text>
      <Text style={{color: 'black', fontSize: 18}}>Client:</Text>
      <Text
        style={{
          color: state.clientConnected ? 'green' : 'red',
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        {state.clientConnected ? 'ON' : 'OFF'}
      </Text>
    </View>
  );
}
