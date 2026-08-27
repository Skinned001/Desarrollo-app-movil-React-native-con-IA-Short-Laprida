import { MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

const visibleTabs = ["index", "create"] as const;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const routes = state.routes.filter((route) =>
    visibleTabs.includes(route.name as (typeof visibleTabs)[number]),
  );

  return (
    <View style={styles.container}>
      {routes.map((route) => {
        const { options } = descriptors[route.key];
        const isFocused = state.routes[state.index]?.key === route.key;
        const title = options.title ?? route.name;
        const iconName = route.name === "create" ? "add" : "list";
        const color = isFocused ? "#00FF00" : "#CCCCCC";

        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            key={route.key}
            onPress={handlePress}
            style={styles.tabButton}
          >
            <LinearGradient
              colors={["#966666", "#633333", "#330000"]}
              end={{ x: 0, y: 1 }}
              start={{ x: 0, y: 0 }}
              style={styles.buttonGradient}
            >
              <MaterialIcons color={color} name={iconName} size={20} />
              <Text style={[styles.tabLabel, { color }]}>{title}</Text>
            </LinearGradient>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderTopColor: "#333333",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabButton: {
    borderColor: "#999999",
    borderRadius: 5,
    borderWidth: 1,
    minWidth: 132,
    overflow: "hidden",
  },
  buttonGradient: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
});
