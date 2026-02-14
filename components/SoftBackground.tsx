import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function SoftBackground({ children }: any) {
  return (
    <LinearGradient
      colors={["#EDE7F6", "#D1C4E9", "#F3E5F5"]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
