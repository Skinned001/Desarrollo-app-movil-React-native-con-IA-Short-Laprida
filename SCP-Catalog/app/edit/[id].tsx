import { useLocalSearchParams, useRouter } from "expo-router";
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

type FormErrors = Partial<Record<keyof FormState | "submit", string>>;

const classOptions: SCPClass[] = ["Safe", "Euclid", "Keter", "Thaumiel"];

const classChipStyles = StyleSheet.create({
  Safe: { backgroundColor: "#081A10", borderColor: "#7CFF8A" },
  Euclid: { backgroundColor: "#1F1A00", borderColor: "#FFD166" },
  Keter: { backgroundColor: "#220808", borderColor: "#FF4D4D" },
  Thaumiel: { backgroundColor: "#180C2C", borderColor: "#C084FC" },
});

const classChipTextStyles = StyleSheet.create({
  Safe: { color: "#7CFF8A" },
  Euclid: { color: "#FFD166" },
  Keter: { color: "#FF4D4D" },
  Thaumiel: { color: "#C084FC" },
});

export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { scps, loading, getSCPById, updateSCP } = useSCP();
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
      setErrors((previousErrors) => ({
        ...previousErrors,
        [field]: undefined,
      }));
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

  const handleSave = async (): Promise<void> => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0 || !id) {
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await updateSCP(id, {
        ItemNumber: form.ItemNumber.trim(),
        Class: form.Class as SCPClass,
        ContainmentProcedures: form.ContainmentProcedures.trim(),
        Description: form.Description.trim(),
      });

      router.replace(`/${id}`);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo actualizar el SCP.";

      setErrors((previousErrors) => ({
        ...previousErrors,
        submit: message,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>

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
                  style={[
                    styles.chip,
                    classChipStyles[option],
                    isSelected && styles.chipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      classChipTextStyles[option],
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {errors.Class ? (
            <Text style={styles.errorText}>{errors.Class}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Procedimientos de Contención</Text>
          <TextInput
            multiline
            numberOfLines={6}
            onChangeText={(value) =>
              updateField("ContainmentProcedures", value)
            }
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
            style={[
              styles.input,
              styles.textArea,
              errors.Description ? styles.inputError : null,
            ]}
            textAlignVertical="top"
            value={form.Description}
          />
          {errors.Description ? (
            <Text style={styles.errorText}>{errors.Description}</Text>
          ) : null}
        </View>

        {errors.submit ? (
          <Text style={styles.submitError}>{errors.submit}</Text>
        ) : null}

        <Pressable
          disabled={isSubmitting}
          onPress={() => void handleSave()}
          style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
        >
          <Text style={styles.saveButtonText}>
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Text>
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
  backButton: {
    alignSelf: "flex-start",
    borderColor: "#00FF00",
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
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: "#00FF00",
    borderColor: "#00FF00",
  },
  chipText: {
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
  submitError: {
    color: "#FF8C42",
    fontSize: 14,
    marginBottom: 12,
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
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#00FF00",
    fontSize: 16,
    fontWeight: "700",
  },
});
