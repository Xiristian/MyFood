// /components/SearchBar.tsx

import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface SearchBarProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChangeText }) => {
  const [text, setText] = useState('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const clearText = () => {
    setText('');
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clearText} style={styles.clearIconContainer}>
        <Icon name="close" type="material" color={text ? '#76A689' : 'transparent'} size={24} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={handleTextChange}
        onEndEditing={() => onChangeText(text)}
      />
      <Icon
        name="search"
        type="material"
        color="#888"
        size={24}
        containerStyle={styles.iconContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(118, 166, 137, 0.1)',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: 'grey',
  },
  iconContainer: {
    marginLeft: 10,
  },
  clearIconContainer: {
    marginRight: 10,
  },
});

export default SearchBar;
