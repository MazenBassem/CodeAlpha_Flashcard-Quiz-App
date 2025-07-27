import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useFlashcard } from "../context/FlashcardContext";

type Props = {
  direction: string;
};

export default function NextButton({ direction }: Props) {
  const { nextCard, prevCard } = useFlashcard();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={direction === "right" ? nextCard : prevCard}
    >
      <Ionicons
        name={
          direction === "right"
            ? "chevron-forward-outline"
            : "chevron-back-outline"
        }
        size={60}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // marginTop: 0,
    backgroundColor: "#00695c",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    margin: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
