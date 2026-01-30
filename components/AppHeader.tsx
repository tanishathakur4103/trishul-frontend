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
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type TabType = "home" | "request" | "friends";

export default function AppHeader({ activeTab }: { activeTab: TabType }) {
  const router = useRouter();

  return (
    <View style={styles.headerWrapper}>
      {/* MAIN HEADER */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />
          {/* <Text style={styles.appName}>UniTalk</Text> */}
        </View>

        <View style={styles.headerIcons}>


          <TouchableOpacity
            style={styles.iconBtn}
            onPress={(e: any) => {
              e?.target?.blur?.();
              router.push("/settings");
            }}
          >
            <Ionicons name="settings-outline" size={22} color="#2d3748" />
          </TouchableOpacity>

        </View>
      </View>

      {/* TABS WITH CARDS */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabsRow}>
          <Tab
            label="Home"
            active={activeTab === "home"}
            onPress={() => router.replace("/home")}
          />
          <Tab
            label="Requests"
            active={activeTab === "request"}
            onPress={() => router.replace("/requests")}
          />
          <Tab
            label="Friends"
            active={activeTab === "friends"}
            onPress={() => router.replace("/friends")}
          />
        </View>
      </View>
    </View>
  );
}

function Tab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tab,
        active && styles.tabActive,
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 20,
    // paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logoImage: {
    width: 80,
    height: 80,
    marginLeft: 10,
  },

  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a202c",
    letterSpacing: -0.3,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },

  iconBtn: {
    padding: 4,
    marginRight:16,
  },

  // TABS CONTAINER
  tabsContainer: {
    backgroundColor: "#f7fafc",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  tabsRow: {
    flexDirection: "row",
    gap: 10,
  },

  // TAB CARD STYLE
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    // Border and Shadow for inactive
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  tabActive: {
    backgroundColor: "#5b8def",
    borderWidth: 1.5,
    borderColor: "#4a7cd6",

    // Enhanced Shadow for active
    shadowColor: "#5b8def",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#718096",
    letterSpacing: 0.3,
  },

  tabLabelActive: {
    color: "#ffffff",
    fontWeight: "700",
  },
});