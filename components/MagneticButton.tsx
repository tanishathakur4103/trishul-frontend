import React, { useRef } from "react";
import { Animated, Pressable, Text, StyleSheet } from "react-native";

export default function MagneticButton({ title }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={[
          styles.btn,
          { transform: [{ scale }] }
        ]}
      >
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#7f5af0",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
