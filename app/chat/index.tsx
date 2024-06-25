import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function index() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="clockcircleo" size={100} color="#003366" />
      </Animated.View>
      <Text style={styles.text}>Coming Soon</Text>
      <Text style={styles.subtext}>We are working on this page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Arka plan rengi
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366", // Başlık rengi
    marginTop: 20,
  },
  subtext: {
    fontSize: 18,
    color: "#666666", // Alt metin rengi
    marginBottom: 20,
  },
});
