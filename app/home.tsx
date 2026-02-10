
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

import MatchFound from "../components/MatchFound";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import BASE_URL from "../src/config/api";

export default function HomeScreen() {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [showMatch, setShowMatch] = useState(false);


  const scaleAnim = useRef(new Animated.Value(1)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  let socket: Socket | null = null;

  const initSocket = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    socket = io(BASE_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("waiting", () => setIsSearching(true));

    socket.on("match-found", () => {
  setIsSearching(false);
  setShowMatch(true); // 🎉 animation start

  setTimeout(() => {
    setShowMatch(false); // animation hide
    router.push("/chat"); // chat screen
  }, 1500);
});


    socket.on("error", ({ message }) => {
      Alert.alert("Error", message);
      setIsSearching(false);
    });
  };

  initSocket();

  // ✅ CLEANUP (only void return)
  return () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };
}, []);


  useEffect(() => {
    if (isSearching) {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.08,
              duration: 900,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 900,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(ringAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
      ringAnim.setValue(0);
    }
  }, [isSearching]);

  const handleFindPartner = () => {
    if (!socketRef.current?.connected) {
      Alert.alert("Error", "Server not connected");
      return;
    }
    setIsSearching(true);
    socketRef.current.emit("find-match");
  };

  const handleCancelSearch = () => {
    socketRef.current?.emit("cancel-search");
    setIsSearching(false);
  };

  const ringScale = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.6],
  });

  const ringOpacity = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader activeTab="home" />

      <View style={styles.content}>
        {/* Animated Hero */}
        <View style={styles.heroWrapper}>
          {isSearching && (
            <Animated.View
              style={[
                styles.ring,
                { transform: [{ scale: ringScale }], opacity: ringOpacity },
              ]}
            />
          )}

          <Animated.View
            style={[styles.heroCircle, { transform: [{ scale: scaleAnim }] }]}
          >
            <Ionicons name="chatbubbles" size={42} color="#fff" />
          </Animated.View>
        </View>

        <Text style={styles.title}>
          {isSearching ? "Finding your match…" : "Start Anonymous Chat"}
        </Text>

        <Text style={styles.subtitle}>
          {isSearching
            ? "Hang tight. We’re connecting you with someone"
            : "Talk freely with students from your university"}
        </Text>

        <TouchableOpacity
          disabled={isSearching}
          onPress={handleFindPartner}
          activeOpacity={0.85}
          style={[
            styles.mainButton,
            isSearching && styles.mainButtonDisabled,
          ]}
        >
          {isSearching ? (
            <View style={styles.btnRow}>
              <ActivityIndicator color="#fff" />
              <Text style={styles.mainButtonText}>Searching</Text>
            </View>
          ) : (
            <View style={styles.btnRow}>
              <Ionicons name="search" size={20} color="#fff" />
              <Text style={styles.mainButtonText}>Find Chat Partner</Text>
            </View>
          )}
        </TouchableOpacity>

        {isSearching && (
          <TouchableOpacity
            onPress={handleCancelSearch}
            style={styles.cancelBtn}
          >
            <Ionicons name="close" size={18} color="#EF4444" />
            <Text style={styles.cancelText}>Cancel Search</Text>
          </TouchableOpacity>
        )}

        {!isSearching && (
          <View style={styles.features}>
            <Feature icon="shield-checkmark" text="Anonymous & Safe" />
            <Feature icon="people" text="Smart Matching" />
            <Feature icon="school" text="College Only" />
          </View>
        )}
      </View>
      <MatchFound visible={showMatch} />
    </SafeAreaView>
  );
}

const Feature = ({ icon, text }: any) => (
  <View style={styles.featureCard}>
    <Ionicons name={icon} size={22} color="#6366F1" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#F5F7FF",
},

  content: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 24,
  paddingBottom: 40,
},


  heroWrapper: {
    marginBottom: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  heroCircle: {
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: "#6366F1",
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#6366F1",
  shadowOpacity: 0.6,
  shadowRadius: 20,
  elevation: 12,
},

  ring: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#6366F1",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },

  mainButton: {
  width: "100%",
  paddingVertical: 18,
  borderRadius: 22,
  backgroundColor: "#6366F1",
  shadowColor: "#6366F1",
  shadowOpacity: 0.45,
  shadowRadius: 18,
  elevation: 10,
},
mainButtonDisabled: {
  backgroundColor: "#A5B4FC",
  shadowOpacity: 0,
},

  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  mainButtonText: {
  color: "#fff",
  fontSize: 17,
  fontWeight: "800",
  letterSpacing: 0.4,
},

  cancelBtn: {
  marginTop: 18,
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: "#FEF2F2",
  borderWidth: 1,
  borderColor: "#FECACA",
},

cancelText: {
  color: "#EF4444",
  fontWeight: "700",
  fontSize: 13,
},

  features: {
    flexDirection: "row",
    marginTop: 40,
    gap: 14,
  },
  featureCard: {
  backgroundColor: "rgba(255,255,255,0.9)",
  paddingVertical: 16,
  paddingHorizontal: 18,
  borderRadius: 18,
  alignItems: "center",
  minWidth: 110,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 4,
  borderWidth: 1,
  borderColor: "#E5E7EB",
},
featureText: {
  marginTop: 8,
  fontSize: 12,
  fontWeight: "700",
  color: "#1F2937",
},

});



