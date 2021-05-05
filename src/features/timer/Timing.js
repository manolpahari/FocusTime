import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';

export const Timing = ({ onTimingChange }) => {

  return(
    <View style={styles.container}>
      <RoundedButton title={"10"} size={75} onPress={ () => onTimingChange(10) }/>
      <RoundedButton title={"15"} size={75} onPress={ () => onTimingChange(15) }/>
      <RoundedButton title={"20"} size={75} onPress={ () => onTimingChange(20) }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
  }
})