import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "./theme";
import { useState } from "react";




export default function Otp() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor={COLORS.muted}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/searching")}
        
      >
        <Text style={styles.buttonText}>Verify</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.white,
    padding: 14,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
