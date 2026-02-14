import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";

export default function UltraCard({ title }: any) {
  const tilt = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(tilt, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(tilt, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const rotateX = tilt.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "8deg"],
  });

  const scale = tilt.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ rotateX }, { scale }],
          },
        ]}
      >
        <BlurView intensity={50} tint="light" style={styles.blur}>
          <Text style={styles.text}>{title}</Text>
        </BlurView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 150,
    borderRadius: 25,
    overflow: "hidden",
    marginVertical: 20,
  },
  blur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});
