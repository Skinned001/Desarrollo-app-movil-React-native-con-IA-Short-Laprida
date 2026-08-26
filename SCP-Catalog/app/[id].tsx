import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { SCPEntity } from "../types/scp";
import { useSCP } from "../context/SCPContext";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getSCPById } = useSCP();
  const [scp, setSCP] = useState<SCPEntity | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoadingDetail(false);
      return;
    }

    const loadSCP = async (): Promise<void> => {
      try {
        const loadedSCP = await getSCPById(id);
        setSCP(loadedSCP);
      } finally {
        setLoadingDetail(false);
      }
    };

    void loadSCP();
  }, [getSCPById, id]);

  return (
    <View style={styles.container}>
      {loadingDetail ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#00FF00" size="large" />
          <Text style={styles.label}>Cargando SCP...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.label}>SCP encontrado:</Text>
          <Text style={styles.id}>{scp?.ItemNumber ?? id}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 24,
  },
  label: {
    color: "#99FF99",
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 12,
  },
  id: {
    color: "#00FF00",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
  },
});
