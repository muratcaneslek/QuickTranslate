import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Share,
  Alert,
} from "react-native";
import * as Speech from "expo-speech";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import LanguagePicker from "../../components/LanguagePicker";
import axios from "axios";
import { API_KEY, API_URL } from "@env";
import {
  init,
  insertTranslation,
  toggleFavoriteTranslation,
  getLastTranslationId,
} from "../../database/database";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("English");
  const [toLanguage, setToLanguage] = useState("Spanish");
  const [favorites, setFavorites] = useState<Boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const languages = [
    { label: "English", value: "English", flag: "GB" },
    { label: "Spanish", value: "Spanish", flag: "ES" },
    { label: "French", value: "French", flag: "FR" },
    { label: "German", value: "German", flag: "DE" },
    { label: "Italian", value: "Italian", flag: "it" },
    { label: "Portuguese", value: "Portuguese", flag: "PT" },
    { label: "Dutch", value: "Dutch", flag: "NL" },
    { label: "Russian", value: "Russian", flag: "RU" },
    { label: "Chinese", value: "Chinese", flag: "CN" },
    { label: "Japanese", value: "Japanese", flag: "JP" },
    { label: "Korean", value: "Korean", flag: "KR" },
    { label: "Turkish", value: "Turkish", flag: "TR" },
    { label: "Hindi", value: "Hindi", flag: "in" },
    { label: "Bengali", value: "Bengali", flag: "BD" },
    { label: "Urdu", value: "Urdu", flag: "PK" },
  ];

  useEffect(() => {
    if (fromLanguage === toLanguage) {
      Alert.alert(
        "Warning",
        "You cannot select the same language for both fields."
      );
      setToLanguage(
        languages.find((lang) => lang.value !== fromLanguage)?.value || ""
      );
    }
  }, [fromLanguage, toLanguage]);

  useEffect(() => {
    const initializeDatabase = () => {
      try {
        init();
      } catch (error) {
        console.log("Initializing db failed.", error);
      }
    };

    initializeDatabase();
  }, []);

  const translateText = async () => {
    try {
      const response = await axios.post(`${API_URL}+${API_KEY}`, {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Translate the following text from ${fromLanguage} to ${toLanguage}: ${text}`,
              },
            ],
          },
        ],
      });

      if (response.status === 200) {
        const translated = response.data.candidates[0].content.parts[0].text;
        setTranslatedText(translated);
        insertTranslation(text, translated, fromLanguage, toLanguage);
      } else {
        console.error(
          "Failed to get translation:",
          response.status,
          response.statusText
        );
        return null;
      }
    } catch (error) {
      Alert.alert(
        "Warning",
        "Failed to translate text. Please try again later.."
      );
      console.log(error);
      return null;
    }
  };

  const handleTranslate = () => {
    translateText();
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClear = () => {
    setText("");
    setTranslatedText("");
  };

  const handleSpeech = (text: string) => {
    Speech.speak(text);
  };

  const handleCopy = async (copyTextText: string) => {
    Clipboard.setStringAsync(copyTextText);
  };

  const changeLanguage = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: translatedText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavourite = () => {
    if (!translatedText) {
      return;
    }
    const lastID = getLastTranslationId();
    setFavorites(true);
    toggleFavoriteTranslation(lastID, favorites);
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageSwitchContainer}>
        <LanguagePicker
          languages={languages}
          selectedLanguage={fromLanguage}
          setSelectedLanguage={setFromLanguage}
          style={styles.languagePicker}
        />
        <TouchableOpacity
          style={styles.exchangeButton}
          onPress={changeLanguage}
        >
          <FontAwesome name="exchange" size={20} color="black" />
        </TouchableOpacity>
        <LanguagePicker
          languages={languages}
          selectedLanguage={toLanguage}
          setSelectedLanguage={setToLanguage}
          style={styles.languagePicker}
        />
      </View>
      <View style={styles.translationContainer}>
        <View style={styles.translationClear}>
          <View style={styles.languageHeader}>
            <Text style={styles.languageText}>{fromLanguage}</Text>
            <TouchableOpacity onPress={() => handleSpeech(text)}>
              <Ionicons
                style={styles.icon}
                name="volume-medium-outline"
                size={24}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearText}>X</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder={text}
          value={text}
          onChangeText={setText}
          ref={inputRef}
          cursorColor={"red"}
        />
        <View style={styles.translateButtonContainer}>
          <TouchableOpacity
            style={styles.translateButton}
            onPress={handleTranslate}
          >
            <Text style={styles.translateButtonText}>Translate</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.translationContainer}>
        <View style={styles.languageHeader}>
          <Text style={styles.languageText}>{toLanguage}</Text>
          <TouchableOpacity onPress={() => handleSpeech(translatedText)}>
            <Ionicons
              style={styles.icon}
              name="volume-medium-outline"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ paddingTop: 10 }}>{translatedText}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => handleCopy(translatedText)}>
            <MaterialIcons name="content-copy" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <MaterialIcons name="share" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavourite}>
            <AntDesign
              name={favorites ? "star" : "staro"}
              size={24}
              style={favorites ? styles.clicked : styles.nonClicked}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  languageSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#dedede",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  languagePicker: {
    flex: 1,
  },
  exchangeButton: {
    padding: 10,
    marginRight: 15,
    marginLeft: 7,
  },
  translationContainer: {
    backgroundColor: "#dedede",
    padding: 20,
    paddingTop: 15,
    borderRadius: 20,
    minHeight: 200,
    marginTop: 25,
  },
  translationClear: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  languageHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    color: "#0C359E",
    fontWeight: "500",
    fontSize: 15,
  },
  icon: {
    color: "#0C359E",
    fontWeight: "500",
    paddingLeft: 10,
  },
  clearText: {
    fontSize: 20,
  },
  textInput: {
    marginTop: 10,
    textAlignVertical: "top",
  },
  translateButtonContainer: {
    alignItems: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  translateButton: {
    backgroundColor: "#FF6500",
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 7,
  },
  translateButtonText: {
    color: "white",
    fontWeight: "400",
    fontSize: 15,
  },
  actionButtons: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    right: 10,
    gap: 10,
  },
  clicked: {
    color: "#FF6500",
  },
  nonClicked: {
    color: "black",
  },
});
