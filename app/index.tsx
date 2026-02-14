import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  return (
    <LinearGradient
      colors={["#F6EFFF", "#EFE4FF", "#E7D9FF"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>trishul.</Text>
          <Image
            source={{
              uri: "https://i.pravatar.cc/100?img=5",
            }}
            style={styles.avatar}
          />
        </View>

        {/* Hero Section */}
        <View style={styles.heroCard}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
            }}
            style={styles.heroImage}
          />
          <Text style={styles.heroTitle}>Connect & Explore</Text>
          <Text style={styles.heroSubtitle}>
            Discover new ideas and connect with friends in one place.
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💬 AI Chat</Text>
          <Text style={styles.cardDesc}>
            Talk with smart AI assistant anytime.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔍 Discover</Text>
          <Text style={styles.cardDesc}>
            Explore trending topics and people.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌟 Explore</Text>
          <Text style={styles.cardDesc}>
            Find new opportunities and grow.
          </Text>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6C4AB6",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },

  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#BBA4FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },

  heroImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6C4AB6",
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#7E7E7E",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#D4C3FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 6,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C4AB6",
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 13,
    color: "#8A8A8A",
  },
});
