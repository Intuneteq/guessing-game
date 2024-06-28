import { ReactNode } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Colors from "../../constants/colors";

type Props = {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};

/**
 * Custom Button component.
 *
 * This is the Primary button for our application.
 */
function PrimaryButton({ children, onPress }: Props) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden", // Ensure that styles from inside the container does not show outside. E.G the ripple effect
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 4, // Add box shadow to container - It is android only and specific so it is not available on IOS
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
