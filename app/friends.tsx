// //friends.tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AppHeader from "../components/AppHeader";

// import { useRouter } from "expo-router";

// const BASE_URL = "http://localhost:5000"; 
// // ⚠️ mobile/expo ke liye LAN IP use karna

// export default function FriendsScreen() {
//   const router = useRouter();
//   const [friends, setFriends] = useState<any[]>([]);

//   useEffect(() => {
//     fetchFriends();
//   }, []);

//   const fetchFriends = async () => {
//     const token = await AsyncStorage.getItem("token");

//     const res = await fetch(`${BASE_URL}/api/requests/friends`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     setFriends(data);
//   };

//   return (
//     <View style={styles.container}>
//             <AppHeader activeTab="friends" />
      
//       {/* <Text style={styles.header}>Your Friends</Text> */}

//       <FlatList
//         data={friends}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>
//             No friends yet 😔
//           </Text>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             activeOpacity={0.7}
//             onPress={() =>
//               router.push({
//                 pathname: "/private-chat",
//                 params: { friendId: item._id },
//               })
//             }
//           >
//             <View style={styles.avatar}>
//               <Text style={styles.avatarText}>
//                 {item.name.charAt(0).toUpperCase()}
//               </Text>
//             </View>

//             <View style={styles.info}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.subtitle}>Tap to chat</Text>
//             </View>

//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },

//   header: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: "#0f172a",
//   },

//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 3,
//   },

//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#e0e7ff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },

//   avatarText: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#4338ca",
//   },

//   info: {
//     flex: 1,
//   },

//   name: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#0f172a",
//   },

//   subtitle: {
//     fontSize: 13,
//     color: "#64748b",
//     marginTop: 2,
//   },

//   arrow: {
//     fontSize: 22,
//     color: "#94a3b8",
//     marginLeft: 8,
//   },

//   emptyText: {
//     textAlign: "center",
//     marginTop: 60,
//     color: "#64748b",
//     fontSize: 15,
//   },
// });




//friends.tsx
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
import { useRouter } from "expo-router";

const BASE_URL = "http://localhost:5000";

export default function FriendsScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/requests/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setFriends(data);
  };

  const formatTimestamp = (timestamp: string) => {
    // You can implement proper time formatting here
    return "2 min ago";
  };

  return (
    <View style={styles.container}>
      <AppHeader activeTab="friends" />

      {/* <View style={styles.headerSection}>
        <Text style={styles.header}>Your Friends</Text>
      </View> */}

      <FlatList
        data={friends}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No friends yet 😔</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/private-chat",
                params: { friendId: item._id },
              })
            }
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.messagePreview}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.lastMessage}>
                  {item.lastMessage || "Hey! What's up?"}
                </Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              <Text style={styles.timestamp}>
                {formatTimestamp(item.lastMessageTime)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8edf3",
    paddingHorizontal: 16,
  },

  headerSection: {
    marginTop: 16,
    marginBottom: 12,
  },

  header: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
  },

  listContainer: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4338ca",
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },

  messagePreview: {
    flexDirection: "row",
    alignItems: "center",
  },

  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
    marginRight: 6,
  },

  lastMessage: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
  },

  rightSection: {
    alignItems: "flex-end",
  },

  timestamp: {
    fontSize: 12,
    color: "#94a3b8",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 15,
  },
});