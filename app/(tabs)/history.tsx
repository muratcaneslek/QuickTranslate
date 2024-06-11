import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchTranslations } from "../../database/database";

type Translation = {
  id: number;
  originalText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
};

export default function History() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const fetchedTranslations: Translation[] = await fetchTranslations();
        setTranslations(fetchedTranslations);
      } catch (error) {
        console.error("Error fetching translations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [translations]);

  const renderCard = ({ item }: { item: Translation }) => (
    <View style={styles.card}>
      <Text style={styles.originalText}>{item.originalText}</Text>
      <Text style={styles.translatedText}>{item.translatedText}</Text>
      <Text style={styles.languageInfo}>
        Translated from {item.fromLanguage} to {item.toLanguage}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading translations...</Text>
      ) : (
        <FlatList
          data={translations}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.noData}>No translation history found.</Text>
          }
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
});
