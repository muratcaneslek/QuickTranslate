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
  }, []);

  const renderItem = ({ item }: { item: Translation }) => (
    <View style={styles.translationItem}>
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
          renderItem={renderItem}
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
    padding: 16,
    backgroundColor: "#fff",
  },
  listContent: {
    flexGrow: 1,
  },
  translationItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  originalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  translatedText: {
    fontSize: 14,
    color: "#555",
  },
  languageInfo: {
    fontSize: 12,
    color: "#888",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});
