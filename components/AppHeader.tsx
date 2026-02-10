// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// type TabType = "chat" | "request" | "friends";

// export default function AppHeader({
//   activeTab,
// }: {
//   activeTab: TabType;
// }) {
//   const router = useRouter();

//   return (
//     <>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <View style={styles.logoRow}>
//           <Image
//             source={require("../assets/logo.png")}
//             style={styles.logoImage}
//           />
//           <Text style={styles.logoText}>UniTalk</Text>
//         </View>
// {/* 
//         <TouchableOpacity onPress={() => router.push("/settings")}>
//           <Ionicons name="settings-outline" size={24} color="#4a5568" />
//         </TouchableOpacity> */}
//       </View>

//       {/* TABS */}
//       <View style={styles.tabs}>
//         <Tab
//           label="Chats"
//           active={activeTab === "chat"}
//           onPress={() => router.replace("/home")}
//         />
//         <Tab
//           label="Requested"
//           active={activeTab === "request"}
//           onPress={() => router.replace("/requests")}
//         />
//         <Tab
//           label="Connected"
//           active={activeTab === "friends"}
//           onPress={() => router.replace("/friends")}
//         />
//       </View>
//     </>
//   );
// }

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

// const styles = StyleSheet.create({
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

//   logoImage: {
//     width: 36,
//     height: 36,
//   },

//   logoText: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#2d3748",
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

//   tabActive: {
//     borderBottomColor: "#5b8def",
//   },

//   tabText: {
//     color: "#718096",
//     fontSize: 15,
//     fontWeight: "500",
//   },

//   tabTextActive: {
//     color: "#5b8def",
//     fontWeight: "600",
//   },
// });





import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type TabType = "home" | "requests" | "profile" | "chat" | "friends" | "settings";

interface Props {
  activeTab: TabType;
}

export default function AppHeader({ activeTab }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {activeTab.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
