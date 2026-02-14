import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function Signup() {
  const [gender, setGender] = useState("");

  return (
    <LinearGradient
      colors={["#f3e8ff", "#d8b4fe", "#f9a8d4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.title}>Create Your UniTalk Account 💜</Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <TextInput
            placeholder="Username"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <TextInput
            placeholder="College Email"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
          />

          <View style={styles.genderContainer}>
            {["Male", "Female", "Other"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.genderButton,
                  gender === item && styles.genderSelected,
                ]}
                onPress={() => setGender(item)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === item && { color: "#fff" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            style={styles.input}
            secureTextEntry
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={["#ec4899", "#a855f7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.note}>
            Only verified college students can join UniTalk
          </Text>
        </BlurView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    borderRadius: 30,
    padding: 25,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  title: {
    fontSize: 22,
    color: "#6b21a8",
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 15,
    borderRadius: 18,
    color: "#4c1d95",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#f3e8ff",
    marginHorizontal: 4,
    alignItems: "center",
  },
  genderSelected: {
    backgroundColor: "#a855f7",
  },
  genderText: {
    color: "#6b21a8",
    fontWeight: "500",
  },
  button: {
    marginTop: 10,
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonGradient: {
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  note: {
    color: "#6b21a8",
    fontSize: 12,
    marginTop: 15,
    textAlign: "center",
  },
});
