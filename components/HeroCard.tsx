import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HeroCard() {
  return (
    <LinearGradient
      colors={["#C5B3F6", "#E1BEE7"]}
      style={styles.card}
    >
      <Text style={styles.title}>
        Chat Anonymously{"\n"}with College Peers
      </Text>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Start Chat</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A148C",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#8E7CFF",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    width: 130,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
