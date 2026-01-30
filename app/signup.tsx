import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import API_BASE_URL from "../src/config/api";

const defaultAvatar = require("../assets/logo.png");

export default function SignupScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const isValid =
    name.trim().length >= 2 &&
    (gender === "Male" || gender === "Female" || gender === "Other") &&
    password.length >= 6;

  const handleSignup = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/auth/complete-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          gender,
          password,
          profilePic: profilePic ? "uploaded_image_url" : "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Signup failed");
        return;
      }

      Alert.alert("Success", "Signup completed");
      router.replace("/login");

    } catch {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Fill details to get started</Text>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatarWrapper}>
        <Image
          source={profilePic ? { uri: profilePic } : defaultAvatar}
          style={styles.avatar}
        />
        <Text style={styles.editText}>Add Photo</Text>
      </TouchableOpacity>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderRow}>
        {["Male", "Female",].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setGender(item)}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: gender === item ? "#2563EB" : "#E2E8F0",
              backgroundColor: gender === item ? "#EFF6FF" : "#FFFFFF",
              alignItems: "center",
              marginRight: item !== "Other" ? 8 : 0,
            }}
          >
            <Text style={{ color: gender === item ? "#2563EB" : "#334155" }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Submit */}
      <TouchableOpacity
        disabled={!isValid || loading}
        onPress={handleSignup}
        style={{
          backgroundColor: isValid ? "#2563EB" : "#CBD5E1",
          height: 52,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          {loading ? "Creating..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  avatarWrapper: {
    alignSelf: "center",          // ✅ horizontal center
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width:100,
    height:100,
    borderRadius: 55,             // ✅ perfect circle
    backgroundColor: "#F1F5F9",
  },

  editText: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 6,
    fontWeight: "500",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
    alignSelf: "center",          // ✅ horizontal center

  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 28,
    alignSelf: "center",          // ✅ horizontal center

  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
    marginBottom: 6,
    marginTop: 16,
    marginLeft:8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
  },

  genderRow: {
    flexDirection: "row",
    marginTop: 6,
  },
});
