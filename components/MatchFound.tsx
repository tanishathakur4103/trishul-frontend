import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MatchFound({ visible }: { visible: boolean }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(ring, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          })
        ),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const ringScale = ring.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const ringOpacity = ring.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.ring,
          { transform: [{ scale: ringScale }], opacity: ringOpacity },
        ]}
      />
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale }], opacity },
        ]}
      >
        <Ionicons name="sparkles" size={42} color="#6366F1" />
        <Text style={styles.title}>Match Found!</Text>
        <Text style={styles.subtitle}>
          You’re now connected 🎉
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  card: {
    width: 240,
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
    elevation: 12,
  },
  ring: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#6366F1",
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
});
