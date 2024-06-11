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
        timestamp TEXT NOT NULL
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
  toLanguage
) => {
  const timestamp = new Date().toISOString();
  try {
    const db = await dbPromise;
    await db.runAsync(
      "INSERT INTO translations (originalText, translatedText, fromLanguage, toLanguage, timestamp) VALUES (?, ?, ?, ?, ?);",
      [originalText, translatedText, fromLanguage, toLanguage, timestamp]
    );
  } catch (error) {
    console.error("Inserting translation failed.", error);
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

export default dbPromise;
