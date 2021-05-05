import React from 'react';
import { Text, View, StyleSheet, Vibration } from 'react-native';
import { colors } from '../../utils/colors';
import { spacing, fontSize } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_MIN = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, cancelFocusSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = React.useState(DEFAULT_MIN);
  const [isStarted, setIsStarted] = React.useState(false);
  const [progress, setProgress] = React.useState(1);

  const progressHandler = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    Vibration.vibrate([1000]);
  }

  const timingChangeHander = (min) => {
    setMinutes(min);
    setIsStarted(false);
    setProgress(1);
  }

  const onEndHander = () => {
    vibrate();
    setMinutes(DEFAULT_MIN);
    setIsStarted(false);
    setProgress(1);
    onTimerEnd();
  }

  console.log(minutes)


  return (
    <View style={styles.container}>
      <View style={styles.countdownContainer}>
        <Countdown isPaused={!isStarted} onProgress={progressHandler} minutes={minutes} onEnd={onEndHander}/>
      </View>
      <Text style={styles.title}>Focusing On: </Text>
      <Text style={styles.text}> {focusSubject} </Text>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar
          color={'#351d7c'}
          style={{ height: 10 }}
          progress={progress}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onTimingChange={timingChangeHander} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.cancelButton}>
          <RoundedButton title="-" size={50} onPress={cancelFocusSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  countdownContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },

  title: {
    color: colors.white,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  text: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  cancelButton: {
    paddingLeft: spacing.xl,
    paddingBottom: spacing.xl
  }
});
