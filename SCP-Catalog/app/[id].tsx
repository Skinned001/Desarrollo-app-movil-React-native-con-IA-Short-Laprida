import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const { deleteSCP, getSCPById } = useSCP();
  const [scp, setSCP] = useState<SCPEntity | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = (): void => {
    if (!id || isDeleting) {
      return;
    }

    setDeleteError(null);
    setIsDeleteConfirmationVisible(true);
  };

  const confirmDelete = (): void => {
    if (!id || isDeleting) {
      return;
    }

    setIsDeleting(true);
    void deleteSCP(id)
      .then(() => router.replace("/"))
      .catch((caughtError) => {
        setDeleteError(
          caughtError instanceof Error
            ? caughtError.message
            : "No se pudo eliminar el SCP",
        );
        setIsDeleting(false);
        setIsDeleteConfirmationVisible(false);
      });
  };

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
        disabled={isDeleting}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Eliminar SCP"
        style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]}
        onPress={handleDelete}
        disabled={isDeleting}
      >
        <Text style={styles.deleteButtonText}>
          {isDeleting ? "Eliminando..." : "Eliminar SCP"}
        </Text>
      </Pressable>

      {isDeleteConfirmationVisible && (
        <View style={styles.confirmationBlock}>
          <Text style={styles.confirmationText}>
            ¿Seguro que deseas eliminar {scp.ItemNumber}?
          </Text>
          <View style={styles.confirmationActions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsDeleteConfirmationVisible(false)}
              style={styles.cancelButton}
              disabled={isDeleting}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={confirmDelete}
              style={styles.confirmButton}
              disabled={isDeleting}
            >
              <Text style={styles.confirmButtonText}>Confirmar eliminación</Text>
            </Pressable>
          </View>
        </View>
      )}

      {deleteError && <Text style={styles.deleteError}>{deleteError}</Text>}
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
  deleteButton: {
    alignSelf: "flex-start",
    borderColor: "#FF4D4D",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  deleteButtonDisabled: {
    opacity: 0.6,
  },
  deleteButtonText: {
    color: "#FF4D4D",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  confirmationBlock: {
    borderColor: "#FF4D4D",
    borderWidth: 1,
    marginTop: 16,
    padding: 16,
  },
  confirmationText: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 14,
  },
  confirmationActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cancelButton: {
    borderColor: "#99FF99",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: "#99FF99",
    fontWeight: "700",
  },
  confirmButton: {
    backgroundColor: "#FF4D4D",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  confirmButtonText: {
    color: "#000000",
    fontWeight: "700",
  },
  deleteError: {
    color: "#FF4D4D",
    fontSize: 14,
    marginTop: 12,
  },
});
