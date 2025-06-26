import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation, toggleSound }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <Image
                    source={require('../assets/images/DS-title_white.png')}
                    style={styles.image}
                    resizeMode="cover"
                />

                <ScrollView contentContainerStyle={styles.buttonContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Anillos')}>
                            <Text style={[styles.buttonText, styles.customFont]}>Anillos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Acerca de')}>
                            <Text style={[styles.buttonText, styles.customFont]}>Acerca de</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={toggleSound}>
                    <Image
                        source={require('../assets/images/Bonfire.gif')}
                        style={styles.imageBonfire}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        height: 50,
        marginTop: '20%',
    },
    imageBonfire: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginBottom: 10
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 15,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    customFont: {
        fontFamily: 'DarkSouls_Font',
    },
});

export default HomeScreen;
