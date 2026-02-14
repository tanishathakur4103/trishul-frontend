import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function UltraBackground({ children }: any) {
  const move = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(move, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = move.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <Animated.View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0f0c29", "#302b63", "#24243e"]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.liquid,
          { transform: [{ translateY }] }
        ]}
      />
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  liquid: {
    position: "absolute",
    width: width * 1.5,
    height: height * 0.6,
    backgroundColor: "#7f5af0",
    borderRadius: 400,
    opacity: 0.15,
    top: height / 3,
    left: -100,
  },
});
