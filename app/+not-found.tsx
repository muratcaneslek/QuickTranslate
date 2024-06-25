import React from "react";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <LottieView
          source={require("../assets/animations/not-found.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <AntDesign name="warning" size={50} color="red" style={styles.icon} />
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  icon: {
    marginVertical: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
