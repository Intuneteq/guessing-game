import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";

import Colors from "./constants/colors";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import StartGameScreen from "./screens/StartGameScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // Tracks game state. True when the user starts the game - the default,
  // then false when game is over - The game guessed the right number
  const [gameIsOver, setGameIsOver] = useState(true);

  // The number of attempts the game took to guess the correct user number
  const [guessRounds, setGuessRounds] = useState(0);

  // Tracks the user chosen number
  const [userNumber, setUserNumber] = useState<number | null>();

  // Load the custom fonts
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // Show Loading state when Fonts is Loading
  if (!fontsLoaded) {
    <AppLoading />;
  }

  // Handles the event for when the user submits a number
  function pickedNumberHandler(pickedNumber: number) {
    // Set the number in state
    setUserNumber(pickedNumber);

    // The Game starts so gameIsOver = false;
    setGameIsOver(false);
  }

  // Fires when the game is over - The Game guesses the user's number right
  function gameOverHandler(numberOfRounds: number) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  /**
   * Fires when user clicks on start new game
   * Restarts by setting game is over state to false.
   * It resets the user number to default - `null`
   * Rests Guess rounds back to zero.
   */
  function startNewGameHandler() {
    setGameIsOver(false);
    setUserNumber(null);
    setGuessRounds(0);
  }

  // Default screen
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // If the user selects a number, move the user to the Game screen - Start the game.
  if (userNumber) {
    screen = (
      <GameScreen onGameOver={gameOverHandler} userNumber={userNumber} />
    );
  }

  /**
   * The Game is over when the `gameOverHandler` function is fired and the user has a number
   * i.e The user is done playing
   */
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
