import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import CountryFlag from "react-native-country-flag";

interface Language {
  label: string;
  value: string;
  flag: string;
}

interface LanguagePickerProps {
  languages: Language[];
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  style?: object;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  languages,
  selectedLanguage,
  setSelectedLanguage,
  style,
}) => {
  return (
    <View style={[styles.dropdownContainer, style]}>
      <Dropdown
        data={languages}
        value={selectedLanguage}
        labelField="label"
        valueField="value"
        onChange={(item: Language) => setSelectedLanguage(item.value)}
        placeholder="Select language"
        renderLeftIcon={() => (
          <View style={styles.flagContainer}>
            {languages.find((lang) => lang.value === selectedLanguage)
              ?.flag && (
              <CountryFlag
                isoCode={
                  languages.find((lang) => lang.value === selectedLanguage)
                    ?.flag || ""
                }
                size={20}
                style={styles.flagIcon}
              />
            )}
          </View>
        )}
        renderItem={(item: Language) => (
          <View style={styles.itemContainer}>
            <CountryFlag
              isoCode={item.flag}
              size={20}
              style={styles.flagIcon}
            />
            <Text>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    marginRight: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default LanguagePicker;
