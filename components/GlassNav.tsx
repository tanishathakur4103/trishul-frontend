import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default function GlassNav() {
  return (
    <BlurView intensity={60} tint="dark" style={styles.nav}>
      <Text style={styles.logo}>AI</Text>
      <Text style={styles.link}>Explore</Text>
      <Text style={styles.link}>Profile</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
  },
  logo: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    color: "white",
  },
});
