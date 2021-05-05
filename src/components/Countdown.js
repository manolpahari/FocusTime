import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fontSize, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if(millis === 0) {
        onEnd();
    }
  }, [millis])

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.countdown}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    padding: spacing.xl,
    backgroundColor: colors.lightBlue,
    color: colors.white,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginTop: spacing.lg,
  },
});
