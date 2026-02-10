import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function Typing() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animate = (dot: Animated.Value, delay: number) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dot, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
  };

  useEffect(() => {
    animate(dot1, 0).start();
    animate(dot2, 150).start();
    animate(dot3, 300).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>typing</Text>
      <Animated.Text style={[styles.dot, { opacity: dot1 }]}>.</Animated.Text>
      <Animated.Text style={[styles.dot, { opacity: dot2 }]}>.</Animated.Text>
      <Animated.Text style={[styles.dot, { opacity: dot3 }]}>.</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    color: "#64748B",
    fontStyle: "italic",
  },
  dot: {
    fontSize: 16,
    color: "#64748B",
    marginLeft: 1,
  },
});
