import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Share } from "react-native";
import * as Clipboard from "expo-clipboard";

export default function HomeScreen() {
  const [text, setText] = useState("merhaba");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setfromLanguage] = useState("English");
  const [toLanguage, settoLanguage] = useState("Spanish");

  const handleTranslate = () => {
    // This should be replaced with an actual translation API call
    const fakeTranslation = "merhaba Murat nasılsın";
    setTranslatedText(fakeTranslation);
  };

  const handleSpeech = (text: string) => {
    Speech.speak(text);
  };
  const handleCopy = async (copyTextText: string) => {
    Clipboard.setStringAsync(copyTextText);
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

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#dedede",
          padding: 20,
          paddingTop: 15,
          borderRadius: 20,
          minHeight: 200,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#0C359E", fontWeight: "500", fontSize: 15 }}>
              {fromLanguage}
            </Text>
            <TouchableOpacity onPress={() => handleSpeech(text)}>
              <Ionicons
                style={{ color: "#0C359E", fontWeight: "500", paddingLeft: 10 }}
                name="volume-medium-outline"
                size={24}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setText("")}>
            <Text style={{ fontSize: 20 }}>X</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            marginTop: 10,
            textAlignVertical: "top",
          }}
          multiline
          numberOfLines={4}
          placeholder={text}
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <View
          style={{
            alignItems: "flex-end",
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#FF6500",
              padding: 7,
              paddingHorizontal: 15,
              borderRadius: 20,
              elevation: 7,
            }}
            onPress={() => handleTranslate()}
          >
            <Text style={{ color: "white", fontWeight: "400", fontSize: 15 }}>
              Translate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#dedede",
          padding: 20,
          paddingTop: 15,
          borderRadius: 20,
          minHeight: 200,
          marginTop: 25,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#0C359E", fontWeight: "500", fontSize: 15 }}>
            {toLanguage}
          </Text>
          <TouchableOpacity onPress={() => handleSpeech(translatedText)}>
            <Ionicons
              style={{ color: "#0C359E", fontWeight: "500", paddingLeft: 10 }}
              name="volume-medium-outline"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ paddingTop: 10 }}>{translatedText}</Text>
        <View
          style={{
            alignItems: "flex-end",
            position: "absolute",
            flexDirection: "row",
            bottom: 10,
            right: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={() => handleCopy(translatedText)}>
            <MaterialIcons name="content-copy" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <MaterialIcons name="share" size={24} color="black" />
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
  },
  languageContainer: {
    flex: 1,
    marginBottom: 20,
  },
});
