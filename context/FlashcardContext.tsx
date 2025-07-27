import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";
import { CurrentRenderContext } from "@react-navigation/native";

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

type FlashcardContextType = {
  cards: Flashcard[];
  currentIndex: number;
  currentCard: Flashcard | null;
  resetFlipSignal: number;
  nextCardSignal: number;
  prevCardSignal: number;
  nextCard: () => void;
  prevCard: () => void;
  addCard: (question: string, answer: string) => Promise<void>;
  updateCard: (id: string, question: string, answer: string) => Promise<void>;
  handelDelete: (id: string) => Promise<void>;
  setCurrentIndexFunc: (id: string) => Promise<void>;
};

const FlashcardContext = createContext<FlashcardContextType | undefined>(
  undefined
);

export const FlashcardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetFlipSignal, setResetFlipSignal] = useState(0);
  const [nextCardSignal, setNextCardSignal] = useState(0);
  const [prevCardSignal, setPrevCardSignal] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await supabase.from("Flash-Card-DataBase").select("*");
      if (data) setCards(data);
    };
    fetchCards();
  }, []);

  const setCurrentIndexFunc = (id: string) => {
    const index = cards.findIndex((card) => card.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const handelDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("Flash-Card-DataBase")
        .delete()
        .eq("id", id);
      if (error) throw error;

      // Refresh the card list after deletion
      const { data } = await supabase.from("Flash-Card-DataBase").select("*");
      if (data) setCards(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCard = async (id: string, question: string, answer: string) => {
    try {
      const { error } = await supabase
        .from("Flash-Card-DataBase")
        .update({ question, answer, updated_At: new Date() }) // ✅ object, not array
        .eq("id", id);

      if (error) throw error;

      // ✅ Optional: Refresh the local cache
      const { data, error: fetchError } = await supabase
        .from("Flash-Card-DataBase")
        .select("*");

      if (fetchError) throw fetchError;
      if (data) setCards(data);

      console.log("Card updated successfully.");
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };

  const addCard = async (question: string, answer: string) => {
    try {
      const { error } = await supabase
        .from("Flash-Card-DataBase")
        .insert([{ question, answer, created_at: new Date() }]);

      if (error) throw error;

      // Refresh the card list
      const { data } = await supabase.from("Flash-Card-DataBase").select("*");
      if (data) setCards(data);
    } catch (err) {
      console.error("Error adding card:", err);
    }
  };

  const nextCard = () => {
    setResetFlipSignal((n) => n + 1); // trigger reset
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setNextCardSignal((n) => n + 1); // 🔥 trigger slide animation
  };

  const prevCard = () => {
    setResetFlipSignal((n) => n + 1); // trigger reset
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length); // 🔁 safe wrap
    setPrevCardSignal((n) => n + 1); // 🔥 trigger slide animation
  };

  const currentCard = cards.length > 0 ? cards[currentIndex] : null;
  const contextValue = React.useMemo(
    () => ({
      cards,
      currentIndex,
      currentCard,
      nextCard,
      prevCard,
      addCard,
      handelDelete,
      updateCard,
      setCurrentIndexFunc,
      resetFlipSignal,
      nextCardSignal, // 🔥 expose signal
      prevCardSignal, // 🔥 expose signal
    }),
    [
      cards,
      currentIndex,
      currentCard,
      nextCard,
      prevCard,
      addCard,
      handelDelete,
      updateCard,
      setCurrentIndexFunc,

      prevCardSignal,
      resetFlipSignal,
      nextCardSignal,
    ]
  );

  return (
    <FlashcardContext.Provider value={contextValue}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcard = () => {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error("useFlashcard must be used within a FlashcardProvider");
  }
  return context;
};
