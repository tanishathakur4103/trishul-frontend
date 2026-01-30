// // app/chat.tsx
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// import { connectSocket, disconnectSocket, getSocket } from "../hooks/socket";
// import { Socket } from "socket.io-client";
// import AppHeader from "../components/AppHeader";

// interface ChatMessage {
//   message: string;
//   me: boolean;
// }

// export default function Chat() {
//   const router = useRouter();
//   const socketRef = useRef<Socket | null>(null);

//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [text, setText] = useState("");
//   const [status, setStatus] = useState("");



//   /* ===============================
//      🔌 INIT SOCKET (ONCE)
//   =============================== */
//   useEffect(() => {
//     const init = async () => {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         router.replace("/login");
//         return;
//       }

//       const socket = connectSocket(token);
//       socketRef.current = socket;
//       socket.emit("find-match");
//       socket.on("waiting", () => {
//         setStatus("Searching for stranger...");
//       });

//       socket.on("match-found", () => {
//         setMessages([]);
//         setStatus("Stranger connected 🕵️");
//       });

//       socket.on("new-message", (data: any) => {
//         setMessages((prev) => [...prev, { message: data.message, me: false }]);
//       });

//       socket.on("message-sent", (data: any) => {
//         setMessages((prev) => [...prev, { message: data.message, me: true }]);
//       });


//       // ❤️ Friend request SENT (👇 YAHAN ADD KARNA THA)
//       socket.on("friend-request-sent", () => {
//         setStatus("Friend request sent ❤️");
//       });

//       socket.on("friend-request-received", ({ from }) => {
//         setStatus("📩 New friend request received");
//       });


//       socket.on("friend-request-accepted", ({ friendId }) => {
//         disconnectSocket();
//         router.replace({
//           pathname: "/private-chat",
//           params: { friendId },
//         });
//       });
//       socket.on("chat-ended", ({ message }) => {
//         setStatus(message || "Chat ended");
//         setMessages([]);



//         setTimeout(() => {
//           disconnectSocket();
//           router.replace({ pathname: "/home" });
//         }, 2000); // thoda delay UX ke liye
//         autoRematch(); // 🔁 auto rematch
//       });


//     };

//     init();

//     return () => {
//       disconnectSocket();
//       socketRef.current = null;
//     };
//   }, []);

//   /* ===============================
//      📤 SEND MESSAGE
//   =============================== */
//   const sendMessage = () => {
//     if (!text.trim()) return;
//     if (!socketRef.current?.connected) return;

//     socketRef.current.emit("send-message", { message: text.trim() });
//     setText("");
//   };

//   /* ===============================
//      👥 SEND FRIEND REQUEST
//   =============================== */
//   const sendFriendRequest = () => {
//     if (!socketRef.current?.connected) return;
//     socketRef.current.emit("send-friend-request");
//   };
//   const endChat = () => {
//     if (!socketRef.current) return;

//     socketRef.current.emit("end-chat");
//     setStatus("You ended the chat");

//     setTimeout(() => {
//       disconnectSocket();
//       router.replace({ pathname: "/home" });
//     }, 2000);
//     autoRematch(); // 🔁 auto rematch
//   };

//   const autoRematch = () => {
//     const socket = getSocket();
//     if (!socket) return;

//     setTimeout(() => {
//       socket.emit("find-match");
//     }, 2000); // 1.5 sec delay
//   };

 
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <AppHeader activeTab="home" />
//  {/* ACTIONS */}
//       <View style={styles.actionsRow}>
//         <TouchableOpacity
//           onPress={sendFriendRequest}
//           style={styles.primaryAction}
//         >
        
//           <Ionicons name="person-add" size={18} color="#f4f8f5" />


//         </TouchableOpacity>

//         <TouchableOpacity onPress={endChat} style={styles.endChatBtn}>
//           {/* <Text style={styles.endChatText}>End Chat</Text> */}
//           <Ionicons name="close-circle" size={18} color="#f4f0f0" />

//         </TouchableOpacity>
//       </View>
//       {/* STATUS BADGE */}
//       {status ? (
//         <View style={styles.statusBadge}>
//           <Text style={styles.statusText}>{status}</Text>
//         </View>
//       ) : null}

//       {/* CHAT AREA */}
//       <FlatList
//         data={messages}
//         keyExtractor={(_, i) => i.toString()}
//         contentContainerStyle={styles.chatList}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageBubble,
//               item.me ? styles.myBubble : styles.otherBubble,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.messageText,
//                 item.me ? styles.myText : styles.otherText,
//               ]}
//             >
//               {item.message}
//             </Text>
//           </View>
//         )}
//       />

//       {/* INPUT CARD */}
//       <View style={styles.inputCard}>
//         <TextInput
//           value={text}
//           onChangeText={setText}
//           placeholder="Type a message…"
//           placeholderTextColor="#94a3b8"
//           style={styles.input}
//           selectionColor="#5b8def"
//           underlineColorAndroid="transparent"
//           returnKeyType="send"         
//           onSubmitEditing={sendMessage}
//         />

//         <TouchableOpacity
//           onPress={sendMessage}
//           disabled={!text.trim()}
//           style={[
//             styles.sendBtn,
//             !text.trim() && styles.sendBtnDisabled,
//           ]}
//         >
//           <Text style={styles.sendText}>Send</Text>
//         </TouchableOpacity>
//       </View>

     
//     </KeyboardAvoidingView>
//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f7f9fc",
//     paddingHorizontal: 14,
//   },

//   statusBadge: {
//     alignSelf: "center",
//     backgroundColor: "#e0ecff",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginVertical: 8,
//   },

//   statusText: {
//     color: "#5b8def",
//     fontWeight: "600",
//     fontSize: 13,
//   },

//   chatList: {
//     flexGrow: 1,
//     paddingVertical: 10,
//   },

//   messageBubble: {
//     maxWidth: "78%",
//     padding: 12,
//     borderRadius: 18,
//     marginVertical: 4,
//   },

//   myBubble: {
//     alignSelf: "flex-end",
//     backgroundColor: "#5b8def",
//     borderBottomRightRadius: 6,
//   },

//   otherBubble: {
//     alignSelf: "flex-start",
//     backgroundColor: "#ffffff",
//     borderBottomLeftRadius: 6,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//   },

//   messageText: {
//     fontSize: 15,
//     lineHeight: 20,
//   },

//   myText: {
//     color: "#ffffff",
//   },

//   otherText: {
//     color: "#1e293b",
//   },

//   inputCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     marginTop: 6,
//   },

//   input: {
//     flex: 1,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 15,
//     borderRadius: 20,
//     color: "#0f172a",

//   },

//   sendBtn: {
//     backgroundColor: "#5b8def",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },

//   sendBtnDisabled: {
//     backgroundColor: "#cbd5e0",
//   },

//   sendText: {
//     color: "#ffffff",
//     fontWeight: "600",
//   },

//   actionsRow: {
//      flexDirection: "row",
//     alignItems: "center",
//     justifyContent:"flex-end",
//     marginTop: 10,
//     gap: 8,
//     marginBottom: 10,
//   },

//   primaryAction: {
//     backgroundColor: "#5b8def",
//     paddingHorizontal:12,
//     paddingVertical:8,
//     borderRadius: 24,
//   },

//   primaryActionText: {
//     color: "#ffffff",
//     fontWeight: "600",
//   },

//   endChatBtn: {
//     paddingVertical: 8,
//     backgroundColor: "#5b8def",
//     padding: 10,
//     borderRadius: 24,
//   },

//   endChatText: {
//     color: "#ef4444",
//     fontWeight: "600",
//   },
// });




// app/chat.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { connectSocket, disconnectSocket, getSocket } from "../hooks/socket";
import { Socket } from "socket.io-client";
import AppHeader from "../components/AppHeader";

interface ChatMessage {
  message: string;
  me: boolean;
}

export default function Chat() {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  /* ===============================
     🔌 INIT SOCKET (ONCE)
  =============================== */
  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }

      const socket = connectSocket(token);
      socketRef.current = socket;
      socket.emit("find-match");
      socket.on("waiting", () => {
        setStatus("Searching for stranger...");
      });

      socket.on("match-found", () => {
        setMessages([]);
        setStatus("Connected with Stranger 2");
      });

      socket.on("new-message", (data: any) => {
        setMessages((prev) => [...prev, { message: data.message, me: false }]);
      });

      socket.on("message-sent", (data: any) => {
        setMessages((prev) => [...prev, { message: data.message, me: true }]);
      });

      // ❤️ Friend request SENT
      socket.on("friend-request-sent", () => {
        setStatus("Friend request sent ❤️");
      });

      socket.on("friend-request-received", ({ from }) => {
        setStatus("📩 New friend request received");
      });

      socket.on("friend-request-accepted", ({ friendId }) => {
        disconnectSocket();
        router.replace({
          pathname: "/private-chat",
          params: { friendId },
        });
      });

      socket.on("chat-ended", ({ message }) => {
        setStatus(message || "Chat ended");
        setMessages([]);

        setTimeout(() => {
          disconnectSocket();
          router.replace({ pathname: "/home" });
        }, 2000);
        autoRematch(); // 🔁 auto rematch
      });
    };

    init();

    return () => {
      disconnectSocket();
      socketRef.current = null;
    };
  }, []);

  /* ===============================
     📤 SEND MESSAGE
  =============================== */
  const sendMessage = () => {
    if (!text.trim()) return;
    if (!socketRef.current?.connected) return;

    socketRef.current.emit("send-message", { message: text.trim() });
    setText("");
  };

  /* ===============================
     👥 SEND FRIEND REQUEST
  =============================== */
  const sendFriendRequest = () => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit("send-friend-request");
  };

  const endChat = () => {
    if (!socketRef.current) return;

    socketRef.current.emit("end-chat");
    setStatus("You ended the chat");

    setTimeout(() => {
      disconnectSocket();
      router.replace({ pathname: "/home" });
    }, 2000);
    autoRematch(); // 🔁 auto rematch
  };

  const skipChat = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("end-chat");
    setStatus("Looking for new stranger...");
    setMessages([]);
    autoRematch();
  };

  const autoRematch = () => {
    const socket = getSocket();
    if (!socket) return;

    setTimeout(() => {
      socket.emit("find-match");
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AppHeader activeTab="home" />

      {/* STATUS BADGE */}
      {status ? (
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            <Ionicons name="people" size={16} color="#1e293b" />
          </View>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      ) : null}

      {/* CHAT AREA */}
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.messageRow}>
            <View
              style={[
                styles.messageBubble,
                item.me ? styles.myBubble : styles.otherBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.me ? styles.myText : styles.otherText,
                ]}
              >
                {item.message}
              </Text>
            </View>
          </View>
        )}
      />

      {/* ACTION BUTTONS */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={sendFriendRequest}
          style={styles.sendRequestBtn}
        >
          <Text style={styles.sendRequestText}>Send Friend Request</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={skipChat} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={endChat} style={styles.endBtn}>
            <Text style={styles.endText}>End Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* INPUT CARD */}
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#94a3b8"
          style={styles.input}
          selectionColor="#5b8def"
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />

        <TouchableOpacity
          onPress={sendMessage}
          disabled={!text.trim()}
          style={styles.sendIconBtn}
        >
          <Ionicons
            name="send"
            size={20}
            color={text.trim() ? "#5b8def" : "#cbd5e0"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8edf3",
    paddingHorizontal: 16,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  statusText: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
  },

  chatList: {
    flexGrow: 1,
    paddingVertical: 10,
  },

  messageRow: {
    marginVertical: 4,
  },

  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 12,
  },

  myBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#5b8def",
    borderBottomRightRadius: 4,
  },

  otherBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e8ecf3",
    borderBottomLeftRadius: 4,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },

  myText: {
    color: "#ffffff",
  },

  otherText: {
    color: "#1e293b",
  },

  actionsContainer: {
    marginBottom: 12,
  },

  sendRequestBtn: {
    backgroundColor: "#5b8def",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },

  sendRequestText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },

  skipBtn: {
    flex: 1,
    backgroundColor: "#5b8def",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  skipText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },

  endBtn: {
    flex: 1,
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  endText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f172a",
  },

  sendIconBtn: {
    padding: 8,
  },
});