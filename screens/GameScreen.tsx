import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/Ui/Title";
import Card from "../components/Ui/Card";
import InstructionText from "../components/Ui/InstructionText";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import NumberContainer from "../components/Game/NumberContainer";
import GuessLogItem from "../components/Game/GuessLogItem";

type Props = {
  userNumber: number;
  onGameOver: (numberOfRounds: number) => void;
};

/**
 * Generate a Random number between a Min and Max Number recursively,
 * recalling the function if the excluded number is generated.
 *
 * @param min Minimum number that can be generated
 * @param max Maximum number that can be generated
 * @param exclude Number to be excluded
 * @returns Generated number
 */
function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen(this: any, { userNumber, onGameOver }: Props) {
  // The initial Game guess
  const initialGuess = generateRandomBetween(1, 100, userNumber); // Exclude the user's input so the game does not guess it on first try.

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  /**
   * Listening to end the game.
   * When the current game guess is equal to the user selected number, end the game.
   */
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  /**
   * Handles the next guess direction and updates the guessing range accordingly.
   * Alerts the user if the direction is logically incorrect based on the current guess.
   * Generates a new guess within the updated range and sets it as the current guess.
   *
   * @param direction - The direction to adjust the next guess.
   *                  - "lower" indicates the next guess should be lower than the current guess,
   *                  - "greater" indicates it should be higher.
   * @returns void
   */
  function nextGuessHandler(direction: "lower" | "greater") {
    const goLower = direction === "lower" && currentGuess < userNumber;
    const goGreater = direction === "greater" && currentGuess > userNumber;

    // Check if the provided direction is logically incorrect
    if (goLower || goGreater) {
      Alert.alert("Don't Lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);

      return;
    }

    // Update the guessing boundaries based on the direction
    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }

    // Generate a new random number within the updated boundaries
    const newRanNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    // Set the new random number as the current guess
    setCurrentGuess(newRanNum);
    setGuessRounds((prev) => [newRanNum, ...prev]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainter}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color={"white"} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - index}
              guess={item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainter: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
