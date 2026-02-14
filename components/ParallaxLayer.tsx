import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export default function ParallaxLayer({ children }: any) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      <Animated.View style={{ transform: [{ translateY }] }}>
        {children}
      </Animated.View>
    </Animated.ScrollView>
  );
}
