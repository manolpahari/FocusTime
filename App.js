import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/Focus';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';

const statuses = {
  COMPLETED: 1,
  CANCELED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { subject: subject, status: status, id: Math.random() },
    ]);
  };

  // useEffect(() => {
  //   if (focusSubject) {
  //     // setFocusHistory([ ...focusHistory, focusSubject ])
  //     focusHistory.current = [...focusHistory.current, focusSubject];
  //   }
  // }, [focusSubject]);

  const saveFousHistory = async (focusHistory) => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
      return;
    } catch (error) {
      if (error) console.log(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if( history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history))
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadFocusHistory()
  }, [] )

  useEffect(() => {
    saveFousHistory(focusHistory);
  }, [focusHistory]);

  const onClearHandler = () => {
     setFocusHistory([])
  };

  console.log(focusHistory);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
            addFocusHistoryWithStatus(focusSubject, statuses.COMPLETED);
          }}
          cancelFocusSubject={() => {
            setFocusSubject(null);
            addFocusHistoryWithStatus(focusSubject, statuses.CANCELED);
          }}
        />
      ) : (
        <Focus
          addSubject={setFocusSubject}
          focusHistory={focusHistory}
          onClear={onClearHandler}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkPurple,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
