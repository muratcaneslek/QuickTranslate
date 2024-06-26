import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  fetchFavouriteTranslations,
  toggleFavoriteTranslation,
} from "../../database/database";
import { AntDesign } from "@expo/vector-icons";

type Translation = {
  id: number;
  originalText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
  isFavorite: boolean;
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
};

export default function Favourite() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Boolean>(true);

  const loadFavouriteTranslations = async () => {
    try {
      const fetchedTranslations: Translation[] =
        await fetchFavouriteTranslations();
      setTranslations(fetchedTranslations);
    } catch (error) {
      console.error("Error fetching favourite translations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavouriteTranslations();
  }, [translations, favorites]);

  const handleToggleFavorite = async (id: number, currentFavorite: boolean) => {
    try {
      await toggleFavoriteTranslation(id, !currentFavorite);
      setTranslations((prevTranslations) =>
        prevTranslations.map((item) =>
          item.id === id ? { ...item, isFavorite: !currentFavorite } : item
        )
      );
      setFavorites(false);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const renderCard = ({ item }: { item: Translation }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.originalText}>
          {truncateText(item.originalText, 30)}{" "}
        </Text>
        <TouchableOpacity
          onPress={() => handleToggleFavorite(item.id, item.isFavorite)}
        >
          <AntDesign
            name={item.isFavorite ? "star" : "staro"}
            size={24}
            style={item.isFavorite ? styles.clicked : styles.nonClicked}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.translatedText}>{item.translatedText}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.languageInfo}>
          Translated from {item.fromLanguage} to {item.toLanguage}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading favourite translations...</Text>
      ) : translations.length === 0 ? (
        <Text style={styles.noData}>No favourite translations found.</Text>
      ) : (
        <FlatList
          data={translations}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  originalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  translatedText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  languageInfo: {
    fontSize: 14,
    color: "#888",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  clicked: {
    color: "#FF6500",
  },
  nonClicked: {
    color: "black",
  },
});
