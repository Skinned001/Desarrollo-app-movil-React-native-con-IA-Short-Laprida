import type { SCPEntity, SCPClass } from "../types/scp";
import { StyleSheet, Text, View } from "react-native";

export interface SCPCardProps {
  scp: SCPEntity;
}

export function SCPCard({ scp }: SCPCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.itemNumber}>{scp.ItemNumber}</Text>
      <Text style={[styles.className, classStyles[scp.Class]]}>
        Clase: {scp.Class}
      </Text>
    </View>
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
});
