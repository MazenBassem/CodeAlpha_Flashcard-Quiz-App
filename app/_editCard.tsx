import { useFlashcard } from "@/context/FlashcardContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function EditCard() {
  const { currentCard, handelDelete, updateCard } = useFlashcard();
  const [question, setQuestion] = useState(currentCard?.question || "");
  const [answer, setAnswer] = useState(currentCard?.answer || "");
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text variant="headlineLarge" style={styles.pageTitle}>
            Edit Card!
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={[styles.card]}>
            <View style={styles.cardHeader}>
              <Button
                style={[
                  {
                    alignSelf: "flex-start",
                  },
                ]}
                onPress={() => {
                  router.back();
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left-bold-box"
                  color={"white"}
                  size={24}
                />
              </Button>
              <Text style={[styles.label, { marginStart: 45, marginEnd: 50 }]}>
                Question:
              </Text>

              <Button
                style={[
                  {
                    alignSelf: "flex-end",
                    marginBottom: 10,
                  },
                ]}
                onPress={() => {
                  router.push("/");
                }}
              >
                <MaterialCommunityIcons
                  name="home-outline"
                  color={"white"}
                  size={24}
                />
              </Button>
            </View>

            <TextInput
              style={styles.input}
              onChangeText={(text) => setQuestion(text)}
              value={question}
              placeholder={"Enter Question"}
              placeholderTextColor={"#ccc1c1ff"}
              autoCorrect={true}
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
              placeholder={"Enter Answer"}
              placeholderTextColor={"#ccc1c1ff"}
              autoCorrect={true}
              textColor="black"
            />
            <View style={styles.buttonsContainer}>
              <Button
                // mode="contained"
                disabled={
                  question !== currentCard?.question ||
                  answer !== currentCard.answer
                }
                style={[
                  styles.deleteButton,
                  (question !== currentCard?.question ||
                    answer !== currentCard.answer) && {
                    backgroundColor: "#888",
                  },
                ]}
                onPress={() => {
                  if (currentCard?.id) {
                    handelDelete(currentCard.id);
                    Toast.show({ type: "delete", text1: "Card Deleted!" });
                    console.log("Deleted");
                    router.push("/");
                  } else {
                    Alert.alert("Error", "No card selected to delete.");
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  color={"white"}
                  size={20}
                />
                <Text style={styles.buttonText}> Delete</Text>
              </Button>
              <Button
                // mode="contained"
                disabled={
                  !question ||
                  !answer ||
                  (question === currentCard?.question &&
                    answer === currentCard?.answer)
                }
                style={[
                  styles.submitButton,
                  (!question ||
                    !answer ||
                    (question === currentCard?.question &&
                      answer === currentCard?.answer)) && {
                    backgroundColor: "#888",
                  },
                  loading && { opacity: 0.6 },
                  { paddingHorizontal: 10 },
                ]}
                onPress={async () => {
                  if (question && answer !== "") {
                    if (currentCard?.id) {
                      setLoading(true);
                      await updateCard(currentCard.id, question, answer);
                      setLoading(false);
                    } else {
                      Alert.alert("Error", "No card selected to update.");
                      console.log("Error, No card selected to update.");
                    }
                  } else {
                    Alert.alert("Error", "Empty fields");
                    console.log("Error, Empty fields");
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="checkbox-marked-outline"
                  color={"white"}
                  size={20}
                />
                <Text style={[styles.buttonText, { margin: 7 }]}>
                  {loading ? "Saving..." : "Save Changes"}
                </Text>
              </Button>
            </View>
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
    width: 340,
    height: 250,
    perspective: "1000", // must be a string alignSelf: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
    marginBottom: 200,
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
  cardHeader: {
    flexDirection: "row",
    // alignItems: "flex-start",
    // borderWidth: 4,
    width: "100%",
  },
  label: {
    margin: 10,
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    width: "70%",
    height: 35,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#311b92",
    // paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    margin: 5,
    height: 40,
    color: "white",
    alignItems: "center",
    width: "40%",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    // paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    margin: 5,
    height: 40,
    color: "white",
    alignItems: "center",
    width: "40%",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "normal",
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
