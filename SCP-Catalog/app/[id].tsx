import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { SCPEntity, SCPClass } from "../types/scp";
import { useSCP } from "../context/SCPContext";

const classBadgeStyles = StyleSheet.create({
  Safe: {
    backgroundColor: "#081A10",
    borderColor: "#7CFF8A",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#7CFF8A",
  },
  Euclid: {
    backgroundColor: "#1F1A00",
    borderColor: "#FFD166",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#FFD166",
  },
  Keter: {
    backgroundColor: "#220808",
    borderColor: "#FF4D4D",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#FF4D4D",
  },
  Thaumiel: {
    backgroundColor: "#180C2C",
    borderColor: "#C084FC",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#C084FC",
  },
});

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
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

  if (loadingDetail) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#00FF00" size="large" />
          <Text style={styles.label}>Cargando SCP...</Text>
        </View>
      </View>
    );
  }

  if (!scp) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>SCP no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBlock}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>

        <Text style={styles.itemNumber}>{scp.ItemNumber}</Text>

        <View style={[styles.badgeWrapper, classBadgeStyles[scp.Class as SCPClass]]}>
          <Text style={[styles.badgeText, classBadgeStyles[scp.Class as SCPClass]]}>
            {scp.Class}
          </Text>
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Procedimientos de Contención</Text>
        <Text style={styles.sectionText}>{scp.ContainmentProcedures}</Text>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.sectionText}>{scp.Description}</Text>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push(`/edit/${id}`)}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 48,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
  },
  loadingContainer: {
    alignItems: "center",
    gap: 12,
  },
  label: {
    color: "#00FF00",
    fontSize: 16,
  },
  notFound: {
    color: "#00FF00",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  headerBlock: {
    marginBottom: 28,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#000000",
    borderColor: "#00FF00",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: "#00FF00",
    fontSize: 15,
    fontWeight: "700",
  },
  itemNumber: {
    color: "#00FF00",
    fontSize: 42,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "left",
  },
  badgeWrapper: {
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  sectionBlock: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#00FF00",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  sectionText: {
    color: "#00FF00",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
  },
  editButton: {
    marginTop: 16,
    alignSelf: "flex-start",
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#00FF00",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  editButtonText: {
    color: "#00FF00",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
