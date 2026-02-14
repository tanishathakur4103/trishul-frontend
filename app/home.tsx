
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
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <LinearGradient
      colors={["#F3F0FF", "#E9D8FD", "#DDD6FE"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.homeText}>Home</Text>
          <View style={styles.notification}>
            <Ionicons name="notifications-outline" size={22} color="#7C3AED" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </View>

        {/* Top Selector Tabs */}
        {/* <View style={styles.tabs}>
          <Text style={styles.activeTab}>Anonymous</Text>
          <Text style={styles.tab}>Requests</Text>
          <Text style={styles.tab}>Friends</Text>
          <Text style={styles.tab}>Settings</Text>
        </View> */}

        {/* Premium Hero Card */}
        <LinearGradient
          colors={["#C084FC", "#7C3AED"]}
          style={styles.heroCard}
        >
          <Text style={styles.heroTitle}>
            Chat Anonymously with College Peers
          </Text>

          <Pressable style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Start Chat</Text>
          </Pressable>
        </LinearGradient>

        {/* Friend Requests */}
        <Text style={styles.sectionTitle}>Friend Requests</Text>

        <View style={styles.row}>
          {["Rahul", "Priya"].map((name, i) => (
            <View key={i} style={styles.requestCard}>
              <View style={styles.avatar} />
              <Text style={styles.name}>{name}</Text>

              <View style={styles.requestButtons}>
                <Pressable style={styles.acceptBtn}>
                  <Text style={styles.acceptText}>Accept</Text>
                </Pressable>
                <Pressable style={styles.rejectBtn}>
                  <Ionicons name="close" size={16} color="white" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* Friends Section */}
        <Text style={styles.sectionTitle}>Your Friends</Text>

        <View style={styles.friendCard}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>Aman</Text>
            <Text style={styles.online}>Online</Text>
          </View>
        </View>

        <View style={styles.friendCard}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>Sneha</Text>
            <Text style={styles.offline}>Offline</Text>
          </View>
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Ionicons name="person-outline" size={20} color="#7C3AED" />
            <Text style={styles.settingText}>Edit Profile</Text>
          </View>

          <View style={styles.settingRow}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={[styles.settingText, { color: "#EF4444" }]}>
              Logout
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Premium Bottom Navbar */}
      <View style={styles.bottomNav}>
        <Ionicons name="chatbubble" size={26} color="#7C3AED" />
        <Ionicons name="mail-outline" size={26} color="#9CA3AF" />
        <Ionicons name="people-outline" size={26} color="#9CA3AF" />
        <Ionicons name="settings-outline" size={26} color="#9CA3AF" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  homeText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#4C1D95",
  },

  notification: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#EF4444",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  activeTab: {
    fontWeight: "700",
    color: "#7C3AED",
    borderBottomWidth: 3,
    borderBottomColor: "#7C3AED",
    paddingBottom: 6,
  },

  tab: {
    color: "#6B7280",
  },

  heroCard: {
    borderRadius: 25,
    padding: 25,
    marginBottom: 30,
    shadowColor: "#7C3AED",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },

  heroTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },

  heroButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },

  heroButtonText: {
    color: "#7C3AED",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4C1D95",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  requestCard: {
    width: width * 0.42,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#DDD6FE",
    marginBottom: 10,
  },

  name: {
    fontWeight: "700",
    marginBottom: 8,
  },

  requestButtons: {
    flexDirection: "row",
    gap: 8,
  },

  acceptBtn: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },

  acceptText: {
    color: "white",
    fontSize: 12,
  },

  rejectBtn: {
    backgroundColor: "#EF4444",
    padding: 6,
    borderRadius: 15,
  },

  friendCard: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },

  online: {
    color: "#10B981",
    fontSize: 12,
  },

  offline: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  settingsCard: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 18,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },

  settingText: {
    fontWeight: "600",
  },

  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 65,
    backgroundColor: "white",
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#7C3AED",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
});
