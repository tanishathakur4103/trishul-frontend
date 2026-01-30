import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import AppHeader from "../components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "../src/config/api";


interface User {
    name: string;
    email: string;
    gender: string;
    profilePic?: string;
}

export default function Settings() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    /* ===============================
       👤 LOAD USER (LOCAL)
    =============================== */
    useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  /* ===============================
     🚪 LOGOUT
  =============================== */
const handleLogout = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
  } catch (e) {
    console.log("Logout API failed (ignored)", e);
  } finally {
    // 🔥 CLEAR STORAGE
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    console.log("Storage after logout:",
      await AsyncStorage.getItem("token"),
      await AsyncStorage.getItem("user")
    );

    // 🔥 NAVIGATE (FIX ROUTE HERE 👇)
    router.replace("/login"); // 🔥 MOST IMPORTANT LINE
  }
};

const logout = () => {
  Alert.alert("Logout", "Are you sure you want to logout?", [
    { text: "Cancel", style: "cancel" },
    { text: "Logout", style: "destructive", onPress: handleLogout },
  ]);
};

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <AppHeader activeTab="settings" /> */}

            {/* PROFILE CARD */}
            <Image
                source={{
                    uri:
                        user.profilePic ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                }}
                style={styles.avatar}
            />

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.infoRow}>
                <Ionicons name="person" size={18} color="#5b8def" />
                <Text style={styles.infoText}>{user.gender}</Text>
            </View>


            {/* LOGOUT */}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                <Ionicons name="log-out" size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        paddingHorizontal: 16,
    },

    card: {
        backgroundColor: "#ffffff",
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
    },

    email: {
        fontSize: 14,
        color: "#64748b",
        marginTop: 2,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 10,
    },

    infoText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
    },

    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 30,
        paddingVertical: 14,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#fecaca",
        backgroundColor: "#fff5f5",
    },

    logoutText: {
        color: "#ef4444",
        fontWeight: "700",
    },
});
