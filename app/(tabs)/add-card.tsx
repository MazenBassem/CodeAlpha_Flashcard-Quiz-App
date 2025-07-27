import { useFlashcard } from "@/context/FlashcardContext";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AddCard() {
  const { addCard } = useFlashcard();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text variant="headlineLarge" style={styles.pageTitle}>
            Create Your Card!
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={[styles.card]}>
            <Text style={styles.label}>Question:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setQuestion(text)}
              value={question}
              placeholder="Enter question"
              placeholderTextColor={"#ccc1c1ff"}
              textColor="black"
              mode="outlined"
              label={"Question"}
            />
            <Text style={styles.label}>Answer:</Text>
            <TextInput
              spellCheck={true}
              label={"Answer"}
              mode="outlined"
              style={styles.input}
              onChangeText={(text) => setAnswer(text)}
              value={answer}
              placeholder="Enter answer"
              placeholderTextColor={"#ccc1c1ff"}
              autoCorrect={true}
              textColor="black"
            />
            <Button
              mode="contained"
              disabled={!question || !answer}
              style={[
                styles.submitButton,
                (!question || !answer) && { backgroundColor: "#888" },
              ]}
              onPress={async () => {
                if (question && answer !== "") {
                  await addCard(question, answer);
                  setQuestion(""); // clear inputs
                  setAnswer("");
                  Toast.show({ type: "success", text1: "Card added!" });
                  console.log("Success, Saved");
                } else {
                  Alert.alert("Error", "Empty fields");
                  console.log("Error, Empty fields");
                }
              }}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    color: "#fff",
    margin: 10,
    fontWeight: "bold",
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
    margin: 10,
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    width: "70%",
    height: 35,
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#311b92",
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    height: 40,
    color: "white",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "normal",
  },
});
