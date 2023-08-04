import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";

// Context
import { ThemeContext } from "@/context/theme";

type AppTextProps = {
  children: string;
  header?: boolean;
};

const AppText: React.FC<AppTextProps> = ({ children, header }) => {
  const theme = useContext(ThemeContext);

  return (
    <Text
      style={[{ color: theme.colors.stone[50] }, header ? styles.header : {}]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: "600",
    fontFamily: "Quicksand",
  },
});

export default AppText;
