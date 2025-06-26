import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../assets/data/imageMap';

const rings = require('../assets/data/ringsData_v5.json').anillos;

const RingItem = React.memo(({ ring, version, isChecked, onCheckboxChange }) => {

    const [showFullLocation, setShowFullLocation] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <View style={styles.item}>

            <TouchableOpacity onPress={onCheckboxChange} style={styles.checkbox}>
                <View style={isChecked ? styles.checked : styles.unchecked} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Image
                    source={images[ring.imagen]}
                    style={styles.image}
                />
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalBackground}>
                    <TouchableOpacity style={styles.modalContainer} onPress={() => setIsModalVisible(false)}>
                        <Image source={images[ring.imagen]} style={styles.fullImage} />
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.info}>
                <Text style={[styles.name, { fontFamily: 'DarkSouls_Font' }]}>
                    {ring.nombre} {version.nivel}
                </Text>
                <Text style={styles.description}>{ring.descripcion} </Text>

                <Text style={styles.location}>
                    {showFullLocation || version.ubicacion.length <= 77
                        ? version.ubicacion
                        : `${version.ubicacion.substring(0, 77)}...`}
                </Text>

                {version.ubicacion.length > 77 && (
                    <TouchableOpacity onPress={() => setShowFullLocation(!showFullLocation)}>
                        <Text style={styles.readMore}>
                            {showFullLocation ? 'Ver menos' : 'Ver más'}
                        </Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.otherDetails}>
                    <Text style={{ fontWeight: '300' }}>Peso:</Text> {version.otros_detalles.peso}
                    {"\n"}
                    <Text style={{ fontWeight: '300' }}>Efecto:</Text> {version.otros_detalles.efecto}
                </Text>
            </View>

        </View>
    );
});

const RingsScreen = () => {

    const [filter, setFilter] = useState('all');
    const [ringStates, setRingStates] = useState({});

    useEffect(() => {

        const loadStates = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const stores = await AsyncStorage.multiGet(keys);
                const states = stores.reduce((acc, [key, value]) => {
                    acc[key] = JSON.parse(value);
                    return acc;
                }, {});
                setRingStates(states);
            } catch (error) {
                console.error(error);
            }
        };

        loadStates();
    }, []);

    useEffect(() => {
        const checkAllChecked = () => {
            const allChecked = Object.values(ringStates).every(value => value);
            if (allChecked && Object.keys(ringStates).length === rings.flatMap(ring => ring.versiones).length) {
                Alert.alert("¡Felicidades!", "Has conseguido todos los anillos. ദ്ദി ༎ຶ‿༎ຶ )");
            }
        };

        checkAllChecked();
    }, [ringStates]);

    const handleCheckboxChange = useCallback(async (ring, version) => {
        const key = `${ring.nombre}_${version.nivel}`;
        const newValue = !ringStates[key];
        setRingStates(prevStates => ({ ...prevStates, [key]: newValue }));

        try {
            await AsyncStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error(error);
        }
    }, [ringStates]);

    const resetAllCheckboxes = async () => {
        Alert.alert(
            'Restablecer todos los checkboxes',
            '¿Estás seguro de que deseas restablecer todos los checkboxes?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sí',
                    onPress: async () => {
                        try {
                            const keys = await AsyncStorage.getAllKeys();
                            await AsyncStorage.multiRemove(keys);
                            setRingStates({});
                        } catch (error) {
                            console.error(error);
                        }
                    },
                },
            ]
        );
    };

    const filteredRings = rings.flatMap(ring =>
        ring.versiones
            .map(version => ({ ...ring, version }))
            .filter(({ nombre, version }) => {
                const key = `${nombre}_${version.nivel}`;
                if (filter === 'checked') return ringStates[key];
                if (filter === 'unchecked') return !ringStates[key];
                return true;
            })
    );

    //const ringsList = rings.flatMap(ring => ring.versiones.map(version => ({ ...ring, version })));

    return (
        <View style={styles.container}>

            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('all')}>
                    <Text style={styles.filterButtonText}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('checked')}>
                    <Text style={styles.filterButtonText}>Marcados</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('unchecked')}>
                    <Text style={styles.filterButtonText}>Desmarcados</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={resetAllCheckboxes}>
                    <Text style={styles.filterButtonText}>Resetear</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredRings}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={10}
                keyExtractor={(item) => `${item.nombre}_${item.version.nivel}`}
                renderItem={({ item }) => (
                    <RingItem
                        ring={item}
                        version={item.version}
                        isChecked={ringStates[`${item.nombre}_${item.version.nivel}`]}
                        onCheckboxChange={() => handleCheckboxChange(item, item.version)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030712',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#1f2937',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#374151',
    },
    filterButtonText: {
        color: '#9ca3af',
        fontWeight: 'bold',
        fontSize: 12,
        fontFamily: 'DarkSouls_Font',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1f2937',
    },
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    checked: {
        width: '100%',
        height: '100%',
        backgroundColor: '#075985',
        borderWidth: 1,
        borderColor: '#38bdf8',
        borderRadius: 3,
        shadowColor: '#7dd3fc',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    unchecked: {
        width: '100%',
        height: '100%',
        backgroundColor: '#111827',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#6b7280',
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 20,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#d4a413',
    },
    description: {
        fontSize: 14,
        color: '#cbd5e1',
    },
    location: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#a1a1aa',
    },
    readMore: {
        fontSize: 12,
        color: '#92400e',
        textDecorationLine: 'underline',
    },
    otherDetails: {
        fontWeight: '200',
        color: '#b7c9e1',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
});

export default RingsScreen;
