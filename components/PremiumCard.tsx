import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default function PremiumCard({ title, subtitle }: any) {
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={60} tint="dark" style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)", // glass border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
});
