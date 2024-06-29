import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

type Props = {
  roundNumber: number;
  guess: number;
};

/**
 * This is the card used to log each guess attempt by the game.
 * 
 * `roundNumber` is the current count of attempts the game is taking to guess the right number
 * 
 * `guess` is the wrong guess made by the game 
 */
function GuessLogItem({ roundNumber, guess }: Props) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
   listItem: {
      borderColor: Colors.primary800,
      borderWidth: 1,
      borderRadius: 40,
      padding: 12,
      marginVertical: 8,
      backgroundColor: Colors.accent500,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: "100%",
      elevation: 4,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0},
      shadowOpacity: 0.25,
      shadowRadius: 3
   },
   itemText: {
      fontFamily: "open-sans"
   }
})