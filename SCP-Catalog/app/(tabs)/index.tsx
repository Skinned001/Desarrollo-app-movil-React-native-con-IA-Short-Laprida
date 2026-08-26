import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSCP } from "../../context/SCPContext";

export default function HomeScreen() {
  const { scps, loading, error, reloadSCPs } = useSCP();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Catálogo SCP</ThemedText>
      <ThemedText style={styles.totalCount}>
        Total de entidades: {scps.length}
      </ThemedText>

      {loading && (
        <ThemedView style={styles.stateContainer}>
          <ActivityIndicator color="#00FF00" size="large" />
          <ThemedText>Cargando SCPs...</ThemedText>
        </ThemedView>
      )}

      {!loading && error && (
        <ThemedView style={styles.stateContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <Pressable
            accessibilityRole="button"
            onPress={() => void reloadSCPs()}
            style={styles.button}
          >
            <ThemedText style={styles.buttonText}>REINTENTAR</ThemedText>
          </Pressable>
        </ThemedView>
      )}

      {!loading && !error && scps.length === 0 && (
        <ThemedView style={styles.stateContainer}>
          <ThemedText>No hay SCPs registrados.</ThemedText>
        </ThemedView>
      )}

      {!loading && !error && scps.length > 0 && (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={scps}
          keyExtractor={(scp) => scp.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.provisionalCard}>
              <ThemedText style={styles.cardLabel}>REGISTRO SCP</ThemedText>
              <ThemedText style={styles.cardItemNumber}>
                {item.ItemNumber}
              </ThemedText>
              <ThemedText style={styles.cardClass}>
                Clase: {item.Class}
              </ThemedText>
              <ThemedText style={styles.cardDescription}>
                {item.Description.slice(0, 100)}
                {item.Description.length > 100 ? "..." : ""}
              </ThemedText>
            </ThemedView>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  totalCount: {
    color: "#99FF99",
    marginTop: 8,
  },
  stateContainer: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 24,
  },
  listContainer: {
    gap: 8,
    paddingVertical: 16,
  },
  provisionalCard: {
    borderColor: "#00FF00",
    borderWidth: 1,
    gap: 6,
    padding: 12,
  },
  cardLabel: {
    color: "#99FF99",
    fontSize: 12,
    fontWeight: "700",
  },
  cardItemNumber: {
    color: "#00FF00",
    fontSize: 18,
    fontWeight: "700",
  },
  cardClass: {
    color: "#FFFF00",
    fontSize: 15,
    fontWeight: "700",
  },
  cardDescription: {
    color: "#00FF00",
    fontSize: 15,
  },
  errorText: {
    color: "#FF3333",
  },
  button: {
    alignSelf: "flex-start",
    borderColor: "#00FF00",
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#00FF00",
    fontWeight: "700",
  },
});
