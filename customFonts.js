// Este archivo me permitirá utilizar la tipogrfia

import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        'DarkSouls_Font': require('./assets/fonts/OptimusPrinceps.ttf'),
    });
};
