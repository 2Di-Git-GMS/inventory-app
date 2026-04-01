import React from "react";
import { StyleSheet, View } from "react-native";

export default function DashboardCard() {
  return <View style={styles.box}></View>;
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
    padding: 16,
    elevation: 4,
  },
});
