import React, { ReactNode } from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

type Props = {
  children: ReactNode;
};

const NumberContainer = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 24,
    borderWidth: 4,
    borderRadius: 8,
    borderColor: Colors.accent500,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    fontFamily: "open-sans-bold",
  },
});
