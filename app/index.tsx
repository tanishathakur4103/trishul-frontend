import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// Agar theme file hai to ye rakho
// warna niche colors direct use kar sakti ho

import { COLORS, GRADIENT } from "./theme";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient colors={GRADIENT} style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.image}
      />

      <Text style={styles.title}>UniTalk</Text>
      <Text style={styles.subtitle}>Anonymous College Chatting</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.btnText}>Get Started →</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    marginBottom: 40,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 5, // Android shadow
  },
  btnText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },
});
