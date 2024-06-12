import * as SQLite from "expo-sqlite";

const dbPromise = SQLite.openDatabaseAsync("translations.db");

export const init = async () => {
  try {
    const db = await dbPromise;
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS translations (
        id INTEGER PRIMARY KEY NOT NULL,
        originalText TEXT NOT NULL,
        translatedText TEXT NOT NULL,
        fromLanguage TEXT NOT NULL,
        toLanguage TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        isFavourite BOOLEAN DEFAULT 0
      );
    `);
  } catch (error) {
    console.error("Initializing db failed.", error);
  }
};

export const insertTranslation = async (
  originalText,
  translatedText,
  fromLanguage,
  toLanguage,
  isFavorite = false
) => {
  const timestamp = new Date().toISOString();
  try {
    const db = await dbPromise;
    await db.runAsync(
      "INSERT INTO translations (originalText, translatedText, fromLanguage, toLanguage, timestamp, isFavorite) VALUES (?, ?, ?, ?, ?, ?);",
      [
        originalText,
        translatedText,
        fromLanguage,
        toLanguage,
        timestamp,
        isFavorite ? 1 : 0,
      ]
    );
  } catch (error) {
    console.error("Inserting translation failed.", error);
  }
};

export const toggleFavoriteTranslation = async (id, isFavorite) => {
  try {
    const db = await dbPromise;
    await db.runAsync("UPDATE translations SET isFavorite = ? WHERE id = ?;", [
      isFavorite ? 1 : 0,
      id,
    ]);
    console.log("Translation favorite status updated");
  } catch (error) {
    console.error("Updating translation favorite status failed.", error);
    throw new Error("Error updating translation favorite status");
  }
};

export const fetchTranslations = async () => {
  try {
    const db = await dbPromise;
    const result = await db.getAllAsync("SELECT * FROM translations;");
    return result;
  } catch (error) {
    console.error("Fetching translations failed.", error);
    return [];
  }
};

export const clearAllTranslations = async () => {
  try {
    const db = await dbPromise;
    await db.execAsync("DELETE FROM translations;");
  } catch (error) {
    console.error("Clearing translations failed.", error);
  }
};

export const deleteTranslation = async (id) => {
  try {
    const db = await dbPromise;
    await db.runAsync("DELETE FROM translations WHERE id = ?;", [id]);
  } catch (error) {
    console.error("Deleting translation failed.", error);
    throw new Error("Error deleting translation");
  }
};

export const fetchFavouriteTranslations = async () => {
  try {
    const db = await dbPromise;
    const result = await db.getAllAsync(
      "SELECT * FROM translations WHERE isFavourite = 1;"
    );
    return result;
  } catch (error) {
    console.error("Fetching favourite translations failed.", error);
    return [];
  }
};

export default dbPromise;
