import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GlowButton({ title }: any) {
  return (
    <Pressable style={styles.wrapper}>
      <LinearGradient
        colors={["#7F5AF0", "#2CB67D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginTop: 25,
    borderRadius: 30,
    shadowColor: "#7F5AF0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
