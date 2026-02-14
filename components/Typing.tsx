import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Typing() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Typing...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    opacity: 0.6,
  },
});
