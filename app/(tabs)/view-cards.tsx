import { useFlashcard } from "@/context/FlashcardContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";

export default function AboutScreen() {
  const { cards, handelDelete, currentCard, setCurrentIndexFunc } =
    useFlashcard();

  const swipeabalRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const renderLeftActions = () => (
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={32}
        color={"white"}
      ></MaterialCommunityIcons>
    </View>
  );

  const renderRightActions = () => (
    <View style={styles.swipeActionRight}>
      <MaterialCommunityIcons
        name="circle-edit-outline"
        size={32}
        color={"white"}
      ></MaterialCommunityIcons>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          {" "}
          FlashCards
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {cards?.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {" "}
              No Cards yet. Add your first Card!{" "}
            </Text>
          </View>
        ) : (
          cards?.map((card, key) => (
            <Swipeable
              ref={(ref) => {
                swipeabalRefs.current[card.id] = ref;
              }}
              key={key}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={renderLeftActions}
              renderRightActions={renderRightActions}
              onSwipeableOpen={(direction) => {
                if (direction === "left") {
                  handelDelete(card.id);
                } else {
                  setCurrentIndexFunc(card?.id);
                  router.push("/_editCard");
                }

                swipeabalRefs.current[card.id]?.close();
              }}
            >
              <Surface style={styles.card} elevation={0}>
                <View style={styles.cardContainer}>
                  <Text style={styles.cardTextQuestion}>{card.question}?</Text>
                  <Text style={styles.cardTextAnswer}>{card.answer}</Text>
                  <View style={styles.cardBadge}>
                    <MaterialCommunityIcons
                      name="cards"
                      size={18}
                      color={"white"}
                    ></MaterialCommunityIcons>
                  </View>
                </View>
              </Surface>
            </Swipeable>
          ))
        )}
      </ScrollView>
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
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.7,
  },
  card: {
    backgroundColor: "#393e46",
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    width: "95%",
    alignSelf: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    // height: "100%"
  },
  cardContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cardTextQuestion: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
  },
  cardTextAnswer: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 6,
  },
  cardBadge: {
    backgroundColor: "#00adb5",
    borderRadius: 8,
    padding: 4,
    alignSelf: "flex-end",
    marginTop: 8,
  },
  text: {
    color: "#fff",
  },
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#e53935",
    borderRadius: 18,
    marginBottom: 8,
    marginTop: 8,
    // width: "90%",
    marginHorizontal: 10,
    paddingLeft: 16,
  },
  swipeActionRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#0f3a6bff",
    borderRadius: 18,
    marginBottom: 8,
    marginTop: 8,
    width: "95%",
    marginHorizontal: 10,
    paddingRight: 16,
  },
});
