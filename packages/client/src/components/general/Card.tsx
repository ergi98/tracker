import React, { useContext } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// Context
import { ThemeContext } from "@/context/theme";

type CardProps = {
  space?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
const Card: React.FC<CardProps> = ({ space, style, children }) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[
        style,
        styles.card,
        space ? styles.innerSpace : {},
        { backgroundColor: theme.colors.stone[900] },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  innerSpace: {
    padding: 12,
  },
  card: {
    borderRadius: 12,
  },
});

export default Card;
