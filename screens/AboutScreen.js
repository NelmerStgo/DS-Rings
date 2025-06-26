import React from 'react';
import * as Linking from 'expo-linking';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AboutScreen = () => {

    const link1 = () => {
        Linking.openURL('https://darksouls.fandom.com/es/wiki/Wiki_Dark_Souls');
    };

    const link2 = () => {
        Linking.openURL('https://www.eliteguias.com/guias/d/dksl3/dark-souls-iii.php');
    };

    const mail = () => {
        Linking.openURL('https://nelmerstgopadron@gmail.com');
    };

    const currentYear = new Date().getFullYear();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dark Seeker</Text>
            <Text style={styles.paragraph}>
                Bienvenido Latente.
            </Text>
            <Text style={styles.paragraph}>
                En un mundo donde la oscuridad y la desolación reinan, tú, un caballero errante en busca de la verdad, has tomado la antorcha para iluminar los rincones más sombríos del Reino de Lothric. Esta aplicación es tu fiel guía, diseñada para asistirte en tu arduo camino hacia la grandeza y la gloria.
            </Text>
            <Text style={styles.paragraph}>
                Aquí encontrarás los secretos mejor guardados, aquellos objetos ocultos en las sombras y las proezas necesarias para reclamar todos los logros que Lothric puede ofrecer. Desde anillos de poder hasta gestos y hechizos olvidados, nuestro compendio te acompañará, asegurándote que nada quede sin descubrir.
            </Text>
            <Text style={styles.paragraph}>
                Adéntrate en este viaje, y que las llamas de tu determinación nunca se extingan.
            </Text>

            <Text style={styles.sectionTitle}>Desarrollador</Text>
            <Text style={styles.developer}>Desarrollado por: Ing. Nelmer Santiago Padrón</Text>
            <Text style={styles.contact}>Contacto: nelmerstgopadron@gmail.com</Text>

            <Text style={styles.sectionTitle}>Fuentes de informacion</Text>
            <TouchableOpacity onPress={link1}>
                <Text style={styles.linkText}>• Dark Souls Wiki</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={link2}>
                <Text style={styles.linkText}>• Dark Souls Wiki</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Version de la Aplicacion</Text>
            <Text style={styles.version}>Versión: 1.0.0</Text>

            <Text style={styles.footerText}>© {currentYear}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090b',
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: '#d4a413',
        fontFamily: 'DarkSouls_Font',
        textAlign: 'center',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 14,
        color: '#cbd5e1',
        marginBottom: 15,
        textAlign: 'justify',
    },
    sectionTitle: {
        fontSize: 18,
        color: '#d4a413',
        fontFamily: 'DarkSouls_Font',
        marginBottom: 10,
    },
    developer: {
        fontSize: 14,
        color: '#cbd5e1',
    },
    contact: {
        fontSize: 14,
        color: '#cbd5e1',
        marginBottom: 20,
    },
    credits: {
        fontSize: 14,
        color: '#cbd5e1',
        marginBottom: 10,
    },
    linkText: {
        color: '#22d3ee',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    version: {
        fontSize: 14,
        color: '#cbd5e1',
        marginBottom: 10,
    },
    footerText: {
        color: '#cbd5e1',
    },
});

export default AboutScreen;
