import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BottomTabs() {
  return (
    <View style={styles.container}>
      <Text style={styles.tab}>Anonymous</Text>
      <Text style={styles.tab}>Requests</Text>
      <Text style={styles.tab}>Friends</Text>
      <Text style={styles.tab}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  tab: {
    color: "#6A1B9A",
    fontWeight: "500",
  },
});
