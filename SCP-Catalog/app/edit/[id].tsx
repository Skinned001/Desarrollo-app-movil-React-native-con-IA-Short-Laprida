import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSCP } from "../../context/SCPContext";
import type { SCPClass, SCPEntity } from "../../types/scp";

type FormState = {
  ItemNumber: string;
  Class: string;
  ContainmentProcedures: string;
  Description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const classOptions: SCPClass[] = ["Safe", "Euclid", "Keter", "Thaumiel"];

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
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof FormState, value: string): void => {
    setForm((previousForm) => ({ ...previousForm, [field]: value }));

    if (errors[field]) {
      setErrors((previousErrors) => ({ ...previousErrors, [field]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.ItemNumber.trim()) {
      nextErrors.ItemNumber = "El número de ítem es obligatorio.";
    }

    if (!classOptions.includes(form.Class as SCPClass)) {
      nextErrors.Class = "Debes seleccionar una clase válida.";
    }

    if (!form.ContainmentProcedures.trim()) {
      nextErrors.ContainmentProcedures =
        "Los procedimientos de contención son obligatorios.";
    }

    if (!form.Description.trim()) {
      nextErrors.Description = "La descripción es obligatoria.";
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleValidate = (): void => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Edición válida para guardar");
    }
  };

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Editando: {scp.ItemNumber}</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Número de Ítem (ej. SCP-173)</Text>
          <TextInput
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={(value) => updateField("ItemNumber", value)}
            placeholder="SCP-173"
            placeholderTextColor="#6BFF8A"
            style={[styles.input, errors.ItemNumber ? styles.inputError : null]}
            value={form.ItemNumber}
          />
          {errors.ItemNumber ? (
            <Text style={styles.errorText}>{errors.ItemNumber}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Clase</Text>
          <View style={styles.chipContainer}>
            {classOptions.map((option) => {
              const isSelected = form.Class === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => updateField("Class", option)}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                >
                  <Text
                    style={[styles.chipText, isSelected && styles.chipTextSelected]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {errors.Class ? <Text style={styles.errorText}>{errors.Class}</Text> : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Procedimientos de Contención</Text>
          <TextInput
            multiline
            numberOfLines={6}
            onChangeText={(value) => updateField("ContainmentProcedures", value)}
            placeholder="Describa los procedimientos..."
            placeholderTextColor="#6BFF8A"
            style={[
              styles.input,
              styles.textArea,
              errors.ContainmentProcedures ? styles.inputError : null,
            ]}
            textAlignVertical="top"
            value={form.ContainmentProcedures}
          />
          {errors.ContainmentProcedures ? (
            <Text style={styles.errorText}>{errors.ContainmentProcedures}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            multiline
            numberOfLines={8}
            onChangeText={(value) => updateField("Description", value)}
            placeholder="Describa la entidad..."
            placeholderTextColor="#6BFF8A"
            style={[styles.input, styles.textArea, errors.Description ? styles.inputError : null]}
            textAlignVertical="top"
            value={form.Description}
          />
          {errors.Description ? (
            <Text style={styles.errorText}>{errors.Description}</Text>
          ) : null}
        </View>

        <Pressable onPress={handleValidate} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
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
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#00FF00",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#000000",
    borderColor: "#00FF00",
    borderRadius: 10,
    borderWidth: 1,
    color: "#00FF00",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: "#FF8C42",
  },
  textArea: {
    minHeight: 140,
    paddingTop: 14,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    borderColor: "#00FF00",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: "#00FF00",
  },
  chipText: {
    color: "#00FF00",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  chipTextSelected: {
    color: "#000000",
  },
  errorText: {
    color: "#FF8C42",
    fontSize: 13,
    marginTop: 6,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderColor: "#00FF00",
    borderWidth: 1,
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  saveButtonText: {
    color: "#00FF00",
    fontSize: 16,
    fontWeight: "700",
  },
});
