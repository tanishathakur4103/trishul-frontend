import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

export default function AIBubble() {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2,
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
          styles.bubble,
          { transform: [{ scale }] }
        ]}
      >
        <Text style={styles.text}>AI</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    bottom: 40,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#7f5af0",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
