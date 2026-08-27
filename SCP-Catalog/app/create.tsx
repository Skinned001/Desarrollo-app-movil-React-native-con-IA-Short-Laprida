import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type FormState = {
  ItemNumber: string;
  Class: string;
  ContainmentProcedures: string;
  Description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  ItemNumber: "",
  Class: "",
  ContainmentProcedures: "",
  Description: "",
};

export default function CreateScreen() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof FormState, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.ItemNumber.trim()) {
      nextErrors.ItemNumber = "El número de ítem es obligatorio.";
    }

    if (!form.Class.trim()) {
      nextErrors.Class = "Debes seleccionar una clase.";
    }

    if (!form.ContainmentProcedures.trim()) {
      nextErrors.ContainmentProcedures = "Los procedimientos de contención son obligatorios.";
    }

    if (!form.Description.trim()) {
      nextErrors.Description = "La descripción es obligatoria.";
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const classOptions = ["Safe", "Euclid", "Keter", "Thaumiel"] as const;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Crear SCP</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Número de Ítem (ej. SCP-173)</Text>
          <TextInput
            style={[styles.input, errors.ItemNumber ? styles.inputError : null]}
            value={form.ItemNumber}
            onChangeText={(value) => updateField("ItemNumber", value)}
            placeholder="SCP-173"
            placeholderTextColor="#6BFF8A"
            autoCapitalize="characters"
            autoCorrect={false}
          />
          {errors.ItemNumber ? <Text style={styles.errorText}>{errors.ItemNumber}</Text> : null}
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
                    isSelected ? styles.chipSelected : styles.chipUnselected,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                    ]}
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
            style={[styles.input, styles.textArea, errors.ContainmentProcedures ? styles.inputError : null]}
            value={form.ContainmentProcedures}
            onChangeText={(value) => updateField("ContainmentProcedures", value)}
            placeholder="Describa los procedimientos..."
            placeholderTextColor="#6BFF8A"
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
          {errors.ContainmentProcedures ? (
            <Text style={styles.errorText}>{errors.ContainmentProcedures}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.Description ? styles.inputError : null]}
            value={form.Description}
            onChangeText={(value) => updateField("Description", value)}
            placeholder="Describa la entidad..."
            placeholderTextColor="#6BFF8A"
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
          />
          {errors.Description ? <Text style={styles.errorText}>{errors.Description}</Text> : null}
        </View>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 48,
  },
  title: {
    color: "#00FF00",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
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
    borderWidth: 1,
    borderColor: "#00FF00",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#00FF00",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
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
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 90,
    alignItems: "center",
  },
  chipUnselected: {
    backgroundColor: "#000000",
    borderColor: "#00FF00",
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
  chipTextUnselected: {
    color: "#00FF00",
  },
  chipTextSelected: {
    color: "#000000",
  },
  inputError: {
    borderColor: "#FF8C42",
  },
  errorText: {
    color: "#FF8C42",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "600",
  },
});
