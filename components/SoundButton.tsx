import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default function SoundButton({ title }: any) {
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/click.mp3")
    );
    await sound.playAsync();
  };

  return (
    <Pressable style={styles.btn} onPress={playSound}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#7f5af0",
    padding: 16,
    borderRadius: 30,
    marginTop: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
