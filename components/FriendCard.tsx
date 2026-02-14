import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FriendCard({ name }: any) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D1C4E9",
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    color: "#4A148C",
    fontWeight: "500",
  },
});
