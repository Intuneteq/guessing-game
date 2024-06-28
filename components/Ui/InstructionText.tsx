import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import Colors from "../../constants/colors";

type Props = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

const InstructionText = ({ children, style }: Props) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontFamily: "open-sans",
    fontSize: 24,
  },
});
