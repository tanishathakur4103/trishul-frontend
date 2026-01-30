//request.tsx
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


export default function Requests() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) setRequests(data.requests);
  };

  const acceptRequest = async (userId: string) => {
    const token = await AsyncStorage.getItem("token");

    await fetch("http://localhost:5000/api/requests/accept", {
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

    await fetch("http://localhost:5000/api/requests/reject", {
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
                  <AppHeader activeTab="request" />
      
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
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0f172a",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  acceptBtn: {
    backgroundColor: "#dcfce7",
  },

  rejectBtn: {
    backgroundColor: "#fee2e2",
  },

  acceptText: {
    color: "#15803d",
    fontWeight: "600",
  },

  rejectText: {
    color: "#b91c1c",
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 60,
    color: "#64748b",
    fontSize: 15,
  },
});

