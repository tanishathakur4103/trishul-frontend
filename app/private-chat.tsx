
// app/private-chat.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";


/* ===============================
   🔹 TYPES (IMPORTANT FOR TS)
=============================== */
interface PrivateMessage {
  message?: string;
  image?: string;
  sender: string;
  type?: "text" | "image" | "voice";
}


interface Friend {
  _id: string;
  name: string;
  profilePic?: string;
}

const BASE_URL = "http://localhost:5000";

export default function PrivateChat() {
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
  const router = useRouter();

  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [friendName, setFriendName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  /* ===============================
     🔹 INIT: LOAD DATA + SOCKET
  =============================== */
  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token || !friendId) return;

      /* 🔹 Friend info (name + pic) */
      const friendsRes = await fetch(`${BASE_URL}/api/requests/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const friends: Friend[] = await friendsRes.json();

      const friend = friends.find((f) => f._id === friendId);
      if (friend) {
        setFriendName(friend.name);
        setProfilePic(friend.profilePic || null);
      }

      /* 🔹 Old messages (REST) */
      const msgRes = await fetch(`${BASE_URL}/api/private-chat/${friendId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const oldMessages: PrivateMessage[] = await msgRes.json();
      setMessages(oldMessages);

      /* 🔥 SOCKET CONNECT */
      const socket = io(BASE_URL, {
        auth: { token },
        transports: ["websocket"],
      });

      socketRef.current = socket;

      // 🔥 Join private room
      socket.emit("join-private-chat", { friendId });

      // 🔥 Receive new messages
      socket.on("new-private-message", (msg: PrivateMessage) => {
        setMessages((prev) => [...prev, msg]);
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [friendId]);

  /* ===============================
     ✉️ SEND MESSAGE (SOCKET)
  =============================== */
  const sendMessage = () => {
    if (!text.trim() || !socketRef.current || !friendId) return;

    socketRef.current.emit("send-private-message", {
      friendId,
      message: text,
    });

    setText("");
  };

  /* ===============================
     📸 HANDLE IMAGE PICKER
  =============================== */

  const handleImagePicker = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        alert("Permission required");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (result.canceled) return;

      const token = await AsyncStorage.getItem("token");
      if (!token || !friendId) return;

      const localUri = result.assets[0].uri;
      const filename = localUri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      const formData = new FormData();
      formData.append("receiverId", friendId);
      if (Platform.OS === "web") {
        const response = await fetch(localUri);
        const blob = await response.blob();

        formData.append("image", blob, filename);
      } else {
        formData.append(
          "image",
          {
            uri: localUri,
            name: filename,
            type,
          } as any
        );
      }

      const res = await fetch(
        `${BASE_URL}/api/private-chat/send-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log("IMAGE RESPONSE:", data);

    } catch (err) {
      console.log("IMAGE ERROR:", err);
    }
  };

  /* ===============================
     🎤 HANDLE VOICE RECORDING
  =============================== */
  const handleVoiceRecord = () => {
    // TODO: Implement voice recording
    // import { Audio } from 'expo-av';
    alert("Voice recording feature - implement with expo-av");
  };

  /* ===============================
     😊 HANDLE EMOJI PICKER
  =============================== */
  const handleEmojiPicker = () => {
    // TODO: Implement emoji picker
    // You can use emoji-mart-native or similar library
    alert("Emoji picker feature - implement with emoji library");
  };

  /* ===============================
     🧠 UI RENDER
  =============================== */
  const renderItem = ({ item }: { item: PrivateMessage }) => {
    const isMe = item.sender !== friendId;

    return (
      <View
        style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}
      >
        {item.image ? (
          <Image
            source={{ uri: `${BASE_URL}${item.image}` }}
            style={{
              width: 180,
              height: 180,
              borderRadius: 12,
            }}
          />
        ) : (
          <Text style={[styles.msgText, isMe && { color: "#fff" }]}>
            {item.message}
          </Text>
        )}
      </View>
    );
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <View style={styles.avatarContainer}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {friendName ? friendName[0].toUpperCase() : "?"}
                </Text>
              </View>
            )}
            {isOnline && <View style={styles.onlineDot} />}
          </View>

          <View style={styles.nameSection}>
            <Text style={styles.headerTitle}>{friendName}</Text>
            <Text style={styles.subTitle}>
              {isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="call-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="videocam-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= MESSAGES ================= */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.chatArea}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* ================= INPUT WITH FEATURES ================= */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          {/* Emoji Button */}
          <TouchableOpacity
            onPress={handleEmojiPicker}
            style={styles.iconBtn}
          >
            <Ionicons name="happy-outline" size={24} color="#64748b" />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            multiline
            maxLength={500}
            underlineColorAndroid="transparent"
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
          />

          {/* Image Button */}
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.iconBtn}
          >
            <Ionicons name="image-outline" size={24} color="#64748b" />
          </TouchableOpacity>

          {/* Voice/Send Button */}
          {text.trim() ? (
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleVoiceRecord}
              style={styles.voiceBtn}
            >
              <Ionicons name="mic-outline" size={24} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8edf3",
  },

  header: {
    height: 64,
    backgroundColor: "#5b8def",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "ios" ? 8 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  backBtn: {
    padding: 4,
    marginRight: 8,
  },

  headerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatarContainer: {
    position: "relative",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5b8def",
  },

  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#5b8def",
  },

  nameSection: {
    flex: 1,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  subTitle: {
    fontSize: 13,
    color: "#e0e7ff",
    marginTop: 2,
  },

  headerActions: {
    flexDirection: "row",
    gap: 8,
  },

  headerIconBtn: {
    padding: 6,
  },

  chatArea: {
    padding: 16,
    paddingBottom: 20,
  },

  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },

  myBubble: {
    backgroundColor: "#5b8def",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },

  otherBubble: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  msgText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1e293b",
  },

  inputContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 28,
    paddingHorizontal: 4,
    paddingVertical: 4,
    minHeight: 48,
  },

  iconBtn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f172a",
    maxHeight: 100,
    borderWidth: 0,
  },

  sendBtn: {
    backgroundColor: "#5b8def",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },

  voiceBtn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },
});