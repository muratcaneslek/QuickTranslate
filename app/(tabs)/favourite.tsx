import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { fetchFavouriteTranslations } from "../../database/database";

export default function Favourite() {
  useEffect(() => {
    const fetchAndLogTranslations = async () => {
      try {
        const translations = await fetchFavouriteTranslations();
        console.log("Favourite Translations:", translations);
      } catch (error) {
        console.error("Error fetching favourite translations:", error);
      }
    };

    fetchAndLogTranslations();
  }, []);

  return (
    <View>
      <Text>Favorite Translations Logging</Text>
    </View>
  );
}
