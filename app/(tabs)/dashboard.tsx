import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "row" }}>
        <View style={styles.box} onLayout={(e) => {
            const { width, height, x, y} = e.nativeEvent.layout;
            console.log("layout:",  {width, height, x, y})
        }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    backgroundColor: "blue",
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
});
