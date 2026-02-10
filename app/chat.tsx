import Typing from "../components/Typing";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { COLORS } from "./theme";
import React, { useState ,useEffect } from "react";
// import { socket } from "../socket";
import { getSocket, connectSocket, disconnectSocket } from "../hooks/socket";




export default function Chat() {
  useEffect(() => {
  if (!socket) return;

  socket.on("typing", () => {
    setIsTyping(true);
  });

  socket.on("stopTyping", () => {
    setIsTyping(false);
  });

  return () => {
    socket.off("typing");
    socket.off("stopTyping");
  };
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.connected}>✨ Connected!</Text>

      <View style={styles.bubbleLeft}>
        <Text>Hey! How’s college life?</Text>
      </View>

      <View style={styles.bubbleRight}>
        <Text>Pretty good 😄 What about you?</Text>
      </View>

      {isTyping && <Typing />}


      <TextInput
  placeholder="Write a message..."
  style={styles.input}
  onChangeText={(text) => {
    if (socket) {
      if (text.length > 0) {
        socket.emit("typing");
      } else {
        socket.emit("stopTyping");
      }
    }
  }}
/>


    </View>
  );
}
const [isTyping, setIsTyping] = useState(false);
const socket = getSocket();


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  connected: {
    textAlign: "center",
    marginVertical: 10,
    color: COLORS.muted,
  },
  bubbleLeft: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  bubbleRight: {
    backgroundColor: "#E0E7FF",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 30,
    marginTop: "auto",
  },
});
