import React, { useState } from "react";
import { StyleSheet, TextInput, View, Alert, Text } from "react-native";

// Custom Imports
import Title from "../components/Ui/Title";
import Colors from "../constants/colors";
import Card from "../components/Ui/Card";
import InstructionText from "../components/Ui/InstructionText";
import PrimaryButton from "../components/Buttons/PrimaryButton";

type Props = {
  onPickNumber: (num: number) => void;
};

const StartGameScreen = ({ onPickNumber }: Props) => {
  // Local state to manage the user's entered number input text field
  const [enteredNumber, setEnteredNumber] = useState("");

  // Handler Function to manage the key stroke events when the user types in a number
  function numberInputHandler(input: string) {
    setEnteredNumber(input);
  }

  // Handler function to confirm and pick a number.
  function confirmInputHandler() {
    // Entered Number will be a string - Every number or text from an input will always be a string
    // So we parse it
    const chosenNumber = parseInt(enteredNumber);

    // Check if the parsed number is not a number and the number is not within our guess range i.e 0 - 99
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // Show an alert popup when the
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );

      return;
    }

    // Fire the onPickNumber function
    onPickNumber(chosenNumber);
  }

  // Resets the Local state
  function resetInputHandler() {
    setEnteredNumber("");
  }

  return (
    <View style={styles.screenContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
