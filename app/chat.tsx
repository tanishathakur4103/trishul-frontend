import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  ImageBackground,
  Animated,
  Switch,
} from "react-native";


interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  read?: boolean;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey Tanisha 👋", sender: "other", read: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate typing + reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Nice 😄",
          sender: "other",
          read: true,
        },
      ]);
    }, 2000);
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me"
          ? styles.myMessage
          : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>

      {item.sender === "me" && (
        <Text style={[styles.tick, item.read && { color: "#4FC3F7" }]}>
          ✓✓
        </Text>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/chat-bg.jpg")} // Add your bg image
      style={styles.background}
      blurRadius={darkMode ? 5 : 0}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: darkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)" },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Premium Chat</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        {isTyping && (
          <Text style={styles.typing}>Typing...</Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Text style={{ color: "#fff" }}>Send</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "75%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0,150,136,0.7)",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  messageText: { color: "#fff" },
  tick: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#ccc",
  },
  typing: {
    fontStyle: "italic",
    color: "#ddd",
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#00BFA5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
