import * as Location from "expo-location";
import { useState } from "react";
import { Button, Linking, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  async function descobrirLocalizacao() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permissão de localização negada");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Perto de você</Text>

      <Text>Descubra conteúdos próximos da sua localização.</Text>

      <Button title="Usar minha localização" onPress={descobrirLocalizacao} />

      {latitude !== null && (
        <View style={styles.resultado}>
          <Text>Latitude: {latitude}</Text>

          <Text>Longitude: {longitude}</Text>

          <Button
            title="Ver no mapa"
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps?q=${latitude},${longitude}`,
              )
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  resultado: {
    padding: 20,
    gap: 10,
  },
});
