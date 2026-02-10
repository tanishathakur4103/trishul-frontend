import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Welcome</Text>
    </View>
  );
}
