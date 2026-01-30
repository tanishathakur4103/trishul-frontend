
// // app/home.tsx
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
//   Alert,
//   Image,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { io, Socket } from "socket.io-client";
// import AppHeader from "../components/AppHeader";

// const SOCKET_URL = "http://localhost:5000";

// export default function HomeScreen() {
//   const router = useRouter();
//   const socketRef = useRef<Socket | null>(null);

//   const [isSearching, setIsSearching] = useState(false);
//   const [activeTab, setActiveTab] = useState<
//     "chat" | "request" | "friends"
//   >("chat");

//   /* ===============================
//      🔐 AUTH + SOCKET CONNECT
//   =============================== */
//   useEffect(() => {
//     const initSocket = async () => {
//       const token = await AsyncStorage.getItem("token");

//       if (!token) {
//         router.replace("/login");
//         return;
//       }

//       const socket = io(SOCKET_URL, {
//         auth: { token },
//         transports: ["websocket"],
//       });

//       socketRef.current = socket;

//       socket.on("connect", () => {
//         console.log("✅ SOCKET CONNECTED");
//       });

//       socket.on("waiting", () => {
//         setIsSearching(true);
//         console.log("⏳ Waiting for match...");
//       });

//       socket.on("match-found", () => {
//         console.log("🎉 Match found");
//         setIsSearching(false);

//         // 👉 Anonymous chat screen
//         router.push("/chat");
//       });

//       socket.on("friend-request-accepted", ({ friendId }) => {
//         console.log("👥 Friend request accepted:", friendId);

//         socket.disconnect();

//         // 👉 Move to private one-to-one chat
//         router.replace({
//           pathname: "/private-chat",
//           params: { friendId },
//         });
//       });

//       socket.on("search-cancelled", ({ message }) => {
//         console.log("🚫 Search cancelled:", message);
//         setIsSearching(false);
//       });

//       socket.on("error", ({ message }) => {
//         Alert.alert("Error", message);
//         setIsSearching(false);
//       });

//       socket.on("disconnect", () => {
//         console.log("❌ SOCKET DISCONNECTED");
//       });

//       socket.on("connect_error", (error) => {
//         console.error("Socket connection failed:", error.message);
//         Alert.alert("Error", "Failed to connect to server");
//       });
//     };

//     initSocket();

//     return () => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//     };
//   }, []);

//   /* ===============================
//      🔍 FIND ANONYMOUS MATCH
//   =============================== */
//   const handleFindPartner = () => {
//     if (!socketRef.current?.connected) {
//       Alert.alert("Error", "Not connected to server");
//       return;
//     }

//     setIsSearching(true);
//     socketRef.current.emit("find-match");
//     console.log("🔍 Finding match...");
//   };

//   /* ===============================
//      ❌ CANCEL SEARCH
//   =============================== */
//   const handleCancelSearch = () => {
//     if (!socketRef.current) return;

//     socketRef.current.emit("cancel-search");
//     setIsSearching(false);
//     console.log("🚫 Cancelling search...");
//   };

//   /* ===============================
//      🧭 TAB CONTENT
//   =============================== */
//   const renderContent = () => {
//     if (activeTab !== "chat") {
//       return (
//         <View style={styles.placeholder}>
//           <Text style={styles.placeholderText}>
//             {activeTab === "request"
//               ? "Friend Requests"
//               : "Connected Friends"}
//           </Text>
//         </View>
//       );
//     }

//     return (

//       <View style={styles.center}>
       
//           <AppHeader activeTab="chat" />
//           <View style={styles.content}>{renderContent()}</View>
//         <Text style={styles.title}>Start a New Conversation</Text>

//         <Text style={styles.subtitle}>
//           Click below to anonymously connect with another student from your
//           university.
//         </Text>

//         <TouchableOpacity
//           disabled={isSearching}
//           onPress={handleFindPartner}
//           style={[
//             styles.findButton,
//             isSearching && styles.findButtonDisabled,
//           ]}
//         >
//           {isSearching ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <Ionicons
//                 name="chatbubble-ellipses-outline"
//                 size={20}
//                 color="#fff"
//               />
//               <Text style={styles.findButtonText}>
//                 Find a Chat Partner
//               </Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {isSearching && (
//           <>
//             <Text style={styles.searchingText}>
//               Searching for a match...
//             </Text>

//             <TouchableOpacity
//               onPress={handleCancelSearch}
//               style={styles.cancelButton}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <View style={styles.logoRow}>
//           <Image
//             source={require("../assets/logo.png")}
//             style={styles.logoImage}
//             resizeMode="contain"
//           />
//           <Text style={styles.logoText}>UniTalk</Text>
//         </View>

//         {/* <TouchableOpacity onPress={() => router.push("/settings")}>
//           <Ionicons
//             name="settings-outline"
//             size={24}
//             color="#4a5568"
//           />
//         </TouchableOpacity> */}
//       </View>

//       {/* TABS */}
//       <View style={styles.tabs}>
//         <Tab
//           label="Chats"
//           active={activeTab === "chat"}
//           onPress={() => setActiveTab("chat")}
//         />
//         <Tab
//           label="Requested"
//           active={activeTab === "request"}
//           onPress={() => {
//             setActiveTab("request");
//             router.push("/requests");
//           }}
//         />
//         <Tab
//           label="Connected"
//           active={activeTab === "friends"}
//           onPress={() => {
//             setActiveTab("friends");
//             router.push("/friends");
//           }}
//         />
//       </View>

//       {/* CONTENT */}
//       <View style={styles.content}>{renderContent()}</View>
//     </SafeAreaView>
//   );
// }

// /* ===============================
//    🔹 TAB COMPONENT
// =============================== */
// function Tab({
//   label,
//   active,
//   onPress,
// }: {
//   label: string;
//   active: boolean;
//   onPress: () => void;
// }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[styles.tab, active && styles.tabActive]}
//     >
//       <Text style={[styles.tabText, active && styles.tabTextActive]}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// /* ===============================
//    🎨 STYLES
// =============================== */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f7f9fc" },

//   header: {
//     backgroundColor: "#ffffff",
//     padding: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e2e8f0",
//   },

//   logoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   logoImage: { width: 36, height: 36 },

//   logoText: {
//     color: "#2d3748",
//     fontSize: 22,
//     fontWeight: "600",
//   },

//   tabs: {
//     flexDirection: "row",
//     backgroundColor: "#ffffff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e2e8f0",
//   },

//   tab: {
//     flex: 1,
//     paddingVertical: 14,
//     alignItems: "center",
//     borderBottomWidth: 2,
//     borderBottomColor: "transparent",
//   },

//   tabActive: { borderBottomColor: "#5b8def" },

//   tabText: {
//     color: "#718096",
//     fontSize: 15,
//     fontWeight: "500",
//   },

//   tabTextActive: {
//     color: "#5b8def",
//     fontWeight: "600",
//   },

//   content: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 24,
//   },

//   center: { alignItems: "center" },

//   title: {
//     fontSize: 26,
//     fontWeight: "600",
//     marginBottom: 16,
//     color: "#1a202c",
//     textAlign: "center",
//   },

//   subtitle: {
//     fontSize: 16,
//     color: "#4a5568",
//     textAlign: "center",
//     marginBottom: 40,
//     lineHeight: 24,
//   },

//   findButton: {
//     backgroundColor: "#5b8def",
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     borderRadius: 8,
//     flexDirection: "row",
//     gap: 10,
//     alignItems: "center",
//     minWidth: 240,
//     justifyContent: "center",
//   },

//   findButtonDisabled: {
//     backgroundColor: "#cbd5e0",
//   },

//   findButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   searchingText: {
//     marginTop: 20,
//     color: "#5b8def",
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   cancelButton: {
//     marginTop: 12,
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderColor: "#cbd5e0",
//     borderRadius: 8,
//   },

//   cancelButtonText: {
//     color: "#4a5568",
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   placeholder: { alignItems: "center" },

//   placeholderText: {
//     fontSize: 18,
//     color: "#4a5568",
//   },
// });


// app/home.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

const SOCKET_URL = "http://localhost:5000";

export default function HomeScreen() {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const initSocket = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }

      const socket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("waiting", () => {
        setIsSearching(true);
      });

      socket.on("match-found", () => {
        setIsSearching(false);
        router.push("/chat");
      });

      socket.on("error", ({ message }) => {
        Alert.alert("Error", message);
        setIsSearching(false);
      });
    };

    initSocket();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Pulse animation for searching state
  useEffect(() => {
    if (isSearching) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isSearching]);

  const handleFindPartner = () => {
    if (!socketRef.current?.connected) {
      Alert.alert("Error", "Not connected to server");
      return;
    }

    setIsSearching(true);
    socketRef.current.emit("find-match");
  };

  const handleCancelSearch = () => {
    socketRef.current?.emit("cancel-search");
    setIsSearching(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader activeTab="home" />

      <View style={styles.content}>
        {/* Decorative Elements */}
      
        <View style={styles.center}>
         
          
          {/* Title Section */}
          <Text style={styles.title}>
            {isSearching
              ? "Finding Your Match..."
              : "Start a New Conversation"}
          </Text>

          <Text style={styles.subtitle}>
            {isSearching
              ? "Please wait while we connect you with someone"
              : "Connect anonymously with another student from your university"}
          </Text>

          {/* Status Indicator */}
          {isSearching && (
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Searching...</Text>
            </View>
          )}

          {/* Main Action Button */}
          <TouchableOpacity
            disabled={isSearching}
            onPress={handleFindPartner}
            style={[
              styles.findButton,
              isSearching && styles.findButtonDisabled,
            ]}
            activeOpacity={0.8}
          >
            {isSearching ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.findButtonText}>Searching</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons
                  name="chatbubble-ellipses"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.findButtonText}>Find Chat Partner</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Cancel Button */}
          {isSearching && (
            <TouchableOpacity
              onPress={handleCancelSearch}
              style={styles.cancelButton}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={18} color="#ef4444" />
              <Text style={styles.cancelButtonText}>Cancel Search</Text>
            </TouchableOpacity>
          )}

          {/* Info Cards */}
          {!isSearching && (
            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <Ionicons name="shield-checkmark" size={24} color="#48bb78" />
                <Text style={styles.infoCardText}>100% Anonymous</Text>
              </View>
              <View style={styles.infoCard}>
                <Ionicons name="people" size={24} color="#5b8def" />
                <Text style={styles.infoCardText}>Smart Matching</Text>
              </View>
              <View style={styles.infoCard}>
                <Ionicons name="school-outline" size={24} color="#48bb78" />
                <Text style={styles.infoCardText}>College students</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    position: "relative",
  },

  // Decorative background circles
  decorativeCircle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#e6f0ff",
    opacity: 0.3,
  },

  decorativeCircle2: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#f0e6ff",
    opacity: 0.3,
  },

  center: {
    alignItems: "center",
    zIndex: 1,
  },

  // Icon Container
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#5b8def",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  searchingIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  ripple: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#5b8def",
    opacity: 0.2,
  },

  // Text Styles
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1a202c",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 15,
    color: "#718096",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Status Indicator
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#e6f0ff",
    borderRadius: 20,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5b8def",
  },

  statusText: {
    fontSize: 14,
    color: "#5b8def",
    fontWeight: "600",
  },

  // Main Button
  findButton: {
    backgroundColor: "#5b8def",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#5b8def",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 260,
  },

  findButtonDisabled: {
    backgroundColor: "#a0b4d4",
    shadowOpacity: 0.1,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  findButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Cancel Button
  cancelButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#fed7d7",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cancelButtonText: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "600",
  },

  // Info Cards
  infoCards: {
    flexDirection: "row",
    marginTop: 48,
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  infoCard: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  infoCardText: {
    fontSize: 12,
    color: "#4a5568",
    fontWeight: "600",
    textAlign: "center",
  },
});



