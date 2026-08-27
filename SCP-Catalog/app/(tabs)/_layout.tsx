import { Tabs } from "expo-router";
import React from "react";

import { CustomTabBar } from "../../components/custom-tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00FF00",
        tabBarStyle: { backgroundColor: "#000000" },
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Catálogo",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Nuevo SCP",
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
