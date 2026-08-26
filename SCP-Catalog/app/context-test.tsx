import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";

import { useSCP } from "../context/SCPContext";

export default function ContextTestScreen() {
  const { scps, loading, error, reloadSCPs } = useSCP();
  const [showEmptyList, setShowEmptyList] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SCP CONTEXT TEST</Text>

      {loading && (
        <View style={styles.stateContainer}>
          <ActivityIndicator color="#00FF00" size="large" />
          <Text style={styles.stateText}>Cargando SCPs...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.stateContainer}>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.button} onPress={() => void reloadSCPs()}>
            <Text style={styles.buttonText}>REINTENTAR</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && (showEmptyList || scps.length === 0) && (
        <Text style={styles.stateText}>No hay SCPs registrados.</Text>
      )}

      {!loading &&
        !error &&
        !showEmptyList &&
        scps.map((scp) => (
          <View key={scp.id} style={styles.record}>
            <Text style={styles.itemNumber}>{scp.ItemNumber}</Text>
            <Text style={styles.className}>Clase: {scp.Class}</Text>
            <Text style={styles.description}>
              {scp.Description.slice(0, 100)}
              {scp.Description.length > 100 ? "..." : ""}
            </Text>
          </View>
        ))}

      {!loading && !error && (
        <Pressable
          accessibilityRole="button"
          onPress={() => setShowEmptyList((currentValue) => !currentValue)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {showEmptyList ? "MOSTRAR SCPs" : "MOSTRAR LISTA VACÍA"}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 12,
    backgroundColor: "#000000",
    padding: 24,
  },
  title: {
    color: "#00FF00",
    fontSize: 22,
    fontWeight: "700",
  },
  record: {
    borderColor: "#00FF00",
    borderWidth: 1,
    padding: 12,
  },
  itemNumber: {
    color: "#00FF00",
    fontSize: 18,
    fontWeight: "700",
  },
  className: {
    marginTop: 4,
    color: "#99FF99",
    fontSize: 15,
  },
  description: {
    marginTop: 8,
    color: "#00FF00",
    fontSize: 16,
  },
  stateContainer: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 24,
  },
  stateText: {
    color: "#00FF00",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    color: "#FF3333",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    borderColor: "#00FF00",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#00FF00",
    fontWeight: "700",
  },
});
