import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F0F0F0",
          borderTopWidth: 1,
          height: 60,
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="history"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.middleIcon}>
              <MaterialCommunityIcons
                name="translate"
                color={"#fff"}
                size={25}
              />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.middleButton} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: () => (
            <Ionicons
              name="star-outline"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  middleButton: {
    top: -10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
    height: 50,
    width: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  middleIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
  },
});
