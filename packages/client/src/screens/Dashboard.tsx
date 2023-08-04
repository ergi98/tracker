import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// Utils
import { HORIZONTAL_PADDING } from "@/utils/dashboard";

// Components
import ProgressDashboard from "@/components/dashboard/ProgressDashboard";

const Dashboard = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.flex}>
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <ProgressDashboard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
});

export default Dashboard;
