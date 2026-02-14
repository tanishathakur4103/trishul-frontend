import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const messages = [
  { id: "1", text: "Hey 👋", sender: "other", time: "10:00 AM" },
  { id: "2", text: "Hello Tanisha 💜", sender: "me", time: "10:01 AM" },
  { id: "3", text: "UniTalk looks amazing 😍", sender: "other", time: "10:02 AM" },
  { id: "4", text: "Thank you! Still upgrading it 🚀", sender: "me", time: "10:05 AM" },
];

export default function PrivateChat() {
  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me"
          ? styles.myMessageContainer
          : styles.otherMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.sender === "me"
            ? styles.myMessage
            : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === "me" && { color: "white" },
          ]}
        >
          {item.text}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <LinearGradient
        colors={["#7F00FF", "#E100FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Tanisha</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="call-outline" size={22} color="white" />
          <Ionicons name="videocam-outline" size={22} color="white" />
        </View>
      </LinearGradient>

      {/* CHAT AREA */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatArea}
      />

      {/* INPUT BAR */}
      <View style={styles.inputContainer}>
        <Ionicons name="happy-outline" size={24} color="#7F00FF" />
        <TextInput
          placeholder="Type a message"
          placeholderTextColor="#888"
          style={styles.input}
        />
        <Ionicons name="image-outline" size={24} color="#7F00FF" />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F2FF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 14,
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },

  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  headerSubtitle: {
    color: "#F5E9FF",
    fontSize: 13,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },

  chatArea: {
    padding: 10,
  },

  messageContainer: {
    marginVertical: 6,
    flexDirection: "row",
  },

  myMessageContainer: {
    justifyContent: "flex-end",
  },

  otherMessageContainer: {
    justifyContent: "flex-start",
  },

  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
  },

  myMessage: {
    backgroundColor: "#9C27B0",
    borderBottomRightRadius: 4,
  },

  otherMessage: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
  },

  messageText: {
    fontSize: 15,
    color: "#333",
  },

  timeText: {
    fontSize: 10,
    color: "#E0C3FC",
    alignSelf: "flex-end",
    marginTop: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#eee",
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#F2E7FE",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },

  sendButton: {
    backgroundColor: "#7F00FF",
    padding: 10,
    borderRadius: 50,
  },
});
