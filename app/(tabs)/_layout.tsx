import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Text,
} from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const handleClearHistory = () => {
    // Geçmişi sıfırla fonksiyonu buraya yazılacak
    Alert.alert("Clear History", "Are you sure you want to clear history?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        onPress: () => {
          // Geçmişi sıfırla işlemi buraya gelecek
          console.log("History cleared!");
        },
      },
    ]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
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
          name="history"
          options={{
            title: "History",
            headerTitle: "History",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearHistory}
              >
                <Text style={styles.clearAll}>Clear all</Text>
              </TouchableOpacity>
            ),
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
            headerTitle: "Language Translator",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerShown: true,
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
          name="favourite"
          options={{
            title: "Favourite",
            headerTitle: "Favourite",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerShown: true,
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
    </>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#003366",
  },
  headerTitleStyle: {
    color: "white",
  },
  clearAll: {
    color: "white",
  },
  middleButton: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
    height: 60,
    width: 60,
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
    height: 55,
    width: 55,
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
  },
  clearButton: {
    marginRight: 15,
    padding: 10,
  },
});
