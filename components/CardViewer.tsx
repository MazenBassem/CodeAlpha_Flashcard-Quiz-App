import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Flashcard, useFlashcard } from "../context/FlashcardContext";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function CardViewer() {
  const { currentCard, resetFlipSignal, nextCardSignal, prevCardSignal } =
    useFlashcard();
  const rotateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    rotateY.value = withTiming(isFlipped ? 0 : 180, { duration: 500 });
    setIsFlipped((prev) => !prev);
  };

  // Reset to front side when signal changes
  useEffect(() => {
    rotateY.value = withTiming(0, { duration: 300 });
    setIsFlipped(false);
  }, [resetFlipSignal]);

  useEffect(() => {
    // Slide out to left
    translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () => {
      // Move off-screen to the right instantly
      translateX.value = SCREEN_WIDTH;

      // Then slide in from the right
      translateX.value = withTiming(0, { duration: 250 });
    });
  }, [nextCardSignal]);

  useEffect(() => {
    // Slide out to left
    translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
      // Move off-screen to the right instantly
      translateX.value = -SCREEN_WIDTH;

      // Then slide in from the right
      translateX.value = withTiming(0, { duration: 250 });
    });
  }, [prevCardSignal]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      rotateY.value,
      [0, 180],
      [0, 180],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        { rotateY: `${rotate}deg` },
        { translateX: translateX.value }, // 👈 slide applied
      ],
      opacity: rotateY.value >= 90 ? 0 : 1,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      rotateY.value,
      [0, 180],
      [180, 360],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        { rotateY: `${rotate}deg` },
        { translateX: translateX.value }, // 👈 slide applied
      ],
      opacity: rotateY.value < 90 ? 0 : 1,
      position: "absolute",
      top: 0,
    };
  });

  const editCard = (card: Flashcard) => {
    // Use imperative navigation instead of returning JSX
    router.push({
      pathname: "/_editCard",
    });
  };

  if (!currentCard) return <Text>Loading...</Text>;

  return (
    <View style={styles.wrapper}>
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.label}>Question:</Text>
          <Text style={styles.content}>{currentCard.question}</Text>
          <TouchableOpacity style={styles.button} onPress={flipCard}>
            <Text style={styles.buttonText}>Show Answer</Text>
          </TouchableOpacity>
          <Button
            textColor="#311b92"
            icon={"application-edit-outline"}
            style={styles.Editbutton}
            onPress={() => editCard(currentCard)}
          >
            <Text style={{ color: "#311b92" }}>Edit Card</Text>
          </Button>
        </Animated.View>

        <Animated.View style={[styles.card, backAnimatedStyle]}>
          <Text style={styles.label}>Answer:</Text>
          <Text style={styles.content}>{currentCard.answer}</Text>
          <TouchableOpacity style={styles.button} onPress={flipCard}>
            <Text style={styles.buttonText}>Back to Question</Text>
          </TouchableOpacity>
          <Button
            textColor="#311b92"
            icon={"circle-edit-outline"}
            style={styles.Editbutton}
            onPress={() => editCard(currentCard)}
          >
            <Text style={{ color: "#311b92" }}>Edit Card</Text>
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: 320,
    height: 250,
    perspective: "1000", // must be a string alignSelf: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ec6e13",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  label: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 30,
    width: 190,
    alignItems: "center",
    backgroundColor: "#311b92",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  Editbutton: {
    marginTop: 5,
    width: 190,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  EditbuttonText: {
    margin: 10,
    color: "#311b92",
    fontSize: 16,
  },
});
