import type { SCPEntity, SCPClass } from "../types/scp";
import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter, type Href } from "expo-router";

export interface SCPCardProps {
  scp: SCPEntity;
}

export function SCPCard({ scp }: SCPCardProps) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/${scp.id}` as Href)}
      style={styles.card}
    >
      <Text style={styles.itemNumber}>{scp.ItemNumber}</Text>
      <Text style={[styles.className, classStyles[scp.Class]]}>
        Clase: {scp.Class}
      </Text>
      <Text style={styles.description}>
        {scp.Description.slice(0, 100)}
        {scp.Description.length > 100 ? "..." : ""}
      </Text>
    </Pressable>
  );
}

const classStyles: Record<SCPClass, { color: string }> = StyleSheet.create({
  Safe: {
    color: "#99FF99",
  },
  Euclid: {
    color: "#FFFF00",
  },
  Keter: {
    color: "#FF3333",
  },
  Thaumiel: {
    color: "#CC66FF",
  },
});

const styles = StyleSheet.create({
  card: {
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
    fontSize: 15,
    fontWeight: "700",
  },
  description: {
    color: "#00FF00",
    fontSize: 15,
  },
});
