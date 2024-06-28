import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    justifyContent: "center", // align vertically
    alignItems: "center", // Align Horizonatally
    elevation: 4, // Add box shadow to container - It is android only and specific so it is not available on IOS

    /**
     * start
     * Add shadow on IOS
     *
     * shadowColor:   It sets the color of the shadow. The values are in `px`
     * shadowOffset:  It controls how much the shadow should be offset from the original object.
     *                  - width to the left and right
     *                  - height to the top and bottom
     * shadowRadius:  It adds border radius around the shadow
     * shadowOpacity: It adds opacity to the shadow
     */
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    /** End of IOS shadow styling */
  },
});
