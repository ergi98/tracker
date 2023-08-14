import { AppText } from "@/components/general";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Progress = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.flex}>
      <AppText>Progress</AppText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default Progress;
