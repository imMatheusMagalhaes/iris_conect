import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useReducer} from 'react';
import ConectionStatus from './src/screens/ConectionStatus';
import ReceivedImages from './src/screens/ReceivedImages';
import {initIrisServer} from './src/services/IrisServer';
import {initialState, IrisContext} from './src/store/contexts/irisContext';
import {irisReducer} from './src/store/reducers/irisReducer';

const Tab = createBottomTabNavigator();

export const defaultListen = {port: 8584, host: '0.0.0.0'};

export default function App() {
  const [state, dispatch] = useReducer(irisReducer, initialState);

  useEffect(() => {
    const server = initIrisServer(defaultListen, dispatch);
    return () => {
      server.close();
    };
  }, []);

  return (
    <IrisContext.Provider value={[state, dispatch]}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            tabBarIconStyle: {display: 'none'},
            tabBarLabelPosition: 'beside-icon',
          }}>
          <Tab.Screen
            options={{title: 'CONECTION STATUS'}}
            name="ConectionStatus"
            component={ConectionStatus}
          />
          <Tab.Screen name="RECEIVED IMAGES" component={ReceivedImages} />
        </Tab.Navigator>
      </NavigationContainer>
    </IrisContext.Provider>
  );
}
