// Imports
import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, StatusBar, Alert, ToastAndroid, Modal } from 'react-native';
import Toast from 'react-native-root-toast';
import { Audio } from 'expo-av';
import { loadFonts } from './customFonts';

// Screens
import HomeScreen from './screens/HomeScreen';
import RingsScreen from './screens/RingsScreen';
import AboutScreen from './screens/AboutScreen';


const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const sound = useRef(null);

  useEffect(() => {
    const load = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('./assets/music/Dark_Souls_3_-_Epilogue.mp3')
      );
      sound.current = newSound;
      await sound.current.playAsync();
      sound.current.setIsLoopingAsync(true); // Para que la música se repita
    };

    loadSound();

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  // Función del sonido
  const toggleSound = async () => {
    if (sound.current) {
      if (isSoundOn) {
        await sound.current.pauseAsync();
        ToastAndroid.show('Sonido Apagado', ToastAndroid.SHORT);
        // Toast.show('Sonido apagado', {
        //   duration: Toast.SHORT,
        //   positon: 70,
        //   shadow: true,
        //   animation: true,
        //   hideOnPress: true,
        //   backgroundColor: '#444',
        //   textColor: 'white',
        // });
      } else {
        await sound.current.playAsync();
        ToastAndroid.show('Sonido encendido', ToastAndroid.SHORT);
      }
      setIsSoundOn(!isSoundOn);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <ActivityIndicator size="50" /> */}
      </View>
    );
  }

  const darkSoulsColors = {
    background: '#000', // Fondo oscuro
    text: '#d4a413', // Texto dorado pálido
    border: '#555555', // Borde gris oscuro
  };

  return (
    <NavigationContainer>

      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      >
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => <HomeScreen {...props} toggleSound={toggleSound} />}
        </Stack.Screen>
        {/* ---------------------------------------------------------------------------------------------- */}
        <Stack.Screen
          name="Anillos"
          component={RingsScreen}
          options={{
            title: 'Anillos',
            headerStyle: {
              backgroundColor: darkSoulsColors.background, // Fondo del header RingsScreen
            },
            headerTintColor: darkSoulsColors.text, // Color del texto e íconos del header específico para RingsScreen
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        {/* ---------------------------------------------------------------------------------------------- */}
        <Stack.Screen
          name="Acerca de"
          component={AboutScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: darkSoulsColors.background,
            },
            headerTintColor: darkSoulsColors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
