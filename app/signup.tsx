import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { COLORS } from "./theme";


export default function Signup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up with College Email</Text>

      <TextInput
        placeholder="example@rtu.ac.in"
        style={styles.input}
        placeholderTextColor={COLORS.muted}
      />

      <LinearGradient colors={["#7C7CFF", "#A78BFA"]} style={styles.button}>
        <Pressable onPress={() => router.push("/otp")}>
          <Text style={styles.btnText}>Send OTP</Text>
        </Pressable>
      </LinearGradient>

      <Text style={styles.note}>
        Only accessible to verified college students
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  note: {
    textAlign: "center",
    marginTop: 16,
    color: COLORS.muted,
  },
});
