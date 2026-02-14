import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function Particles() {
  const particles = Array.from({ length: 8 });

  return (
    <>
      {particles.map((_, i) => (
        <Particle key={i} delay={i * 800} />
      ))}
    </>
  );
}

function Particle({ delay }: any) {
  const move = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(move, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = move.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50],
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        { transform: [{ translateY }] }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
    width: 12,
    height: 12,
    backgroundColor: "#7f5af0",
    borderRadius: 6,
    opacity: 0.4,
    top: Math.random() * 600,
    left: Math.random() * 350,
  },
});
