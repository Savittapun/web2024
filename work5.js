import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function Work5() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [zoom, setZoom] = useState(0);
    const cameraRef = useRef(null);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Work 5: ตั้งชื่อ App</Text>
            <Camera 
                style={styles.camera} 
                type={type} 
                zoom={zoom}
                ref={cameraRef}
            >
                <View style={styles.controls}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}
                    >
                        <Text style={styles.buttonText}>สลับกล้อง</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setZoom(Math.min(zoom + 0.1, 1))}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setZoom(Math.max(zoom - 0.1, 0))}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <Text style={styles.footer}>653380043-4 สวิตตา แสงวรรณกูล</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' },
    header: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    camera: { width: '90%', height: 400, borderRadius: 10, overflow: 'hidden' },
    controls: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
    button: { backgroundColor: '#007bff', padding: 10, margin: 5, borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    footer: { fontSize: 16, fontWeight: 'bold', marginTop: 10 }
});
