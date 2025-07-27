import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useFlashcard } from "@/context/FlashcardContext";

type Flashcard = {
  question: string;
  answer: string;
  // add other fields if needed
};

export const FlashcardScreen = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Fetch flashcards
  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from("Flash-Card-DataBase")
        .select("*");
      if (data) setCards(data);
    };
    fetchCards();
  }, []);

  // Next card
  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        <>
          <Text style={styles.question}>{cards[currentIndex].question}</Text>
          {showAnswer && (
            <Text style={styles.answer}>{cards[currentIndex].answer}</Text>
          )}
          <Button
            title={showAnswer ? "Hide Answer" : "Show Answer"}
            onPress={() => setShowAnswer(!showAnswer)}
          />
          <Button title="Next Card" onPress={nextCard} />
        </>
      ) : (
        <View>
          <Text>Loading flashcards...</Text>
          <Text>{cards.length}</Text>
        </View>
      )}
    </View>
  );
};

export async function addCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  try {
    const updates = {
      question,
      answer,
      updated_at: new Date(),
    };
    const { error } = await supabase
      .from("Flash-Card-DataBase")
      .insert([{ question, answer, created_at: new Date() }]);

    if (error) {
      throw error;
    }

    Alert.alert("Card Saved Succefully");
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    useFlashcard;
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  question: { fontSize: 24, marginBottom: 20, fontWeight: "bold" },
  answer: { fontSize: 18, marginBottom: 20, color: "green" },
});
