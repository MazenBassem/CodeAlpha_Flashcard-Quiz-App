import { StyleSheet, View } from "react-native";

import CardViewer from "@/components/CardViewer";
import NextButton from "@/components/NextButton";
import { useFlashcard } from "@/context/FlashcardContext";
const placeholder = require("../../assets/images/icon.png");

export default function Index() {
  const { cards } = useFlashcard();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CardViewer />
      </View>
      <View style={styles.buttonContainer}>
        <NextButton direction="left" />
        <NextButton direction="right" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-evenly",
    margin: 40,
    paddingTop: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    // marginBottom: 40,
    marginBottom: 40,
    paddingBottom: 80,
  },
});
