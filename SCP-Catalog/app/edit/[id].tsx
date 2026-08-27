import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSCP } from "../../context/SCPContext";
import type { SCPEntity } from "../../types/scp";

type FormState = {
  ItemNumber: string;
  Class: string;
  ContainmentProcedures: string;
  Description: string;
};

export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { scps, loading, getSCPById } = useSCP();
  const [scp, setSCP] = useState<SCPEntity | null>(null);
  const [form, setForm] = useState<FormState>({
    ItemNumber: "",
    Class: "",
    ContainmentProcedures: "",
    Description: "",
  });

  useEffect(() => {
    if (!id) {
      setSCP(null);
      return;
    }

    const selectedSCP = scps.find((item) => item.id === id);

    if (selectedSCP) {
      setSCP(selectedSCP);
      setForm({
        ItemNumber: selectedSCP.ItemNumber,
        Class: selectedSCP.Class,
        ContainmentProcedures: selectedSCP.ContainmentProcedures,
        Description: selectedSCP.Description,
      });
      return;
    }

    const loadSCP = async (): Promise<void> => {
      try {
        const fetchedSCP = await getSCPById(id);
        setSCP(fetchedSCP);
        setForm({
          ItemNumber: fetchedSCP.ItemNumber,
          Class: fetchedSCP.Class,
          ContainmentProcedures: fetchedSCP.ContainmentProcedures,
          Description: fetchedSCP.Description,
        });
      } catch {
        setSCP(null);
      }
    };

    void loadSCP();
  }, [getSCPById, id, scps]);

  if (loading && !scp) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#00FF00" size="large" />
        <Text style={styles.label}>Cargando SCP...</Text>
      </View>
    );
  }

  if (!scp) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>SCP no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editando: {scp.ItemNumber}</Text>
      <Text style={styles.subtitle}>Datos cargados correctamente.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  label: {
    color: "#00FF00",
    fontSize: 16,
    marginTop: 12,
  },
  title: {
    color: "#00FF00",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#00FF00",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  error: {
    color: "#FF8C42",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
});
