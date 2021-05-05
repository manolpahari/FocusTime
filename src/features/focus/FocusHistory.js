import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSize, spacing } from '../../utils/sizes';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const HistoryList = ({ item, index }) => {
    return <Text style={styles.subject(item.status)}>{item.subject}</Text>;
  };

  console.log('focusHistory = === ', focusHistory);

  return (
    <SafeAreaView style={styles.container}>
      {!!focusHistory.length && (
        <>
          <Text style={styles.title}> Things We've Focused On: </Text>
          <FlatList
            style={{ flex: 1 }}
            renderItem={HistoryList}
            data={focusHistory}
            keyExtractor={(item) => item.id}
          />
          <RoundedButton title={'Clear'} size={75} onPress={onClear}/>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.md,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    color: colors.white,
  },
  subject: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSize.sm,
    paddingTop: spacing.sm,
    textAlign: 'center',
  }),
});
