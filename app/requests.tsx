//requests.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppHeader from "../components/AppHeader";
import BASE_URL from "../src/config/api";



export default function Requests() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) setRequests(data.requests);
  };

  const acceptRequest = async (userId: string) => {
    const token = await AsyncStorage.getItem("token");

    await fetch(`${BASE_URL}/api/requests/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ senderId: userId }),
    });

    setRequests((prev) => prev.filter((r) => r._id !== userId));
  };

  const rejectRequest = async (userId: string) => {
    const token = await AsyncStorage.getItem("token");

    await fetch(`${BASE_URL}/api/requests/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ senderId: userId }),
    });

    setRequests((prev) => prev.filter((r) => r._id !== userId));
  };

  return (
    <View style={styles.container}>
                  <AppHeader activeTab="requests" />
      
      {/* <Text style={styles.header}>Friend Requests</Text> */}

      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No pending friend requests 🙂
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>sent you a friend request</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.btn, styles.acceptBtn]}
                onPress={() => acceptRequest(item._id)}
              >
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.rejectBtn]}
                onPress={() => rejectRequest(item._id)}
              >
                <Text style={styles.rejectText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },

  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  acceptBtn: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  rejectBtn: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  acceptText: {
    color: "#059669",
    fontWeight: "700",
    fontSize: 14,
  },

  rejectText: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 14,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 120,
    color: "#6B7280",
    fontSize: 15,
  },
});
