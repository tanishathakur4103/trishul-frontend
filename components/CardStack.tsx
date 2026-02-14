import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";

export default function CardStack() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.card, { top: 20, zIndex: 1, opacity: 0.6 }]} />
      <View style={[styles.card, { top: 10, zIndex: 2, opacity: 0.8 }]} />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            zIndex: 3,
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              {
                rotate: pan.x.interpolate({
                  inputRange: [-200, 200],
                  outputRange: ["-10deg", "10deg"],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.text}>AI Dashboard</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    width: 300,
    height: 180,
    backgroundColor: "#1f1f3d",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
