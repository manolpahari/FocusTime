import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { FocusHistory } from './FocusHistory';
import { colors } from '../../utils/colors';
import { spacing, fontSize } from '../../utils/sizes';

export const Focus = ({ addSubject, focusHistory, onClear }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.focusContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}> What would you like to focus on? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 20 }}
            onSubmitEditing={({ nativeEvent }) => setSubject(nativeEvent.text)}
          />
          <RoundedButton
            size={50}
            title={'+'}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
          <View style={styles.foucsHistoryContainer }>
            <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  focusContainer: {
    flex: 1,
    backgroundColor: colors.darkPurple,
  },
  innerContainer: {
    flex: 0.3,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foucsHistoryContainer: {
    flex: 0.5
  }
});
