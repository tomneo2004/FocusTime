import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {paddingSize, fontSize} from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time<10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd
}) => {
  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time)=>{
      if(time === 0){
        clearInterval(interval.current);
        return time;
      }

      const timeLeft = time - 1000;
      return timeLeft;
    })
  }
  
  const [millis, setMillis] = React.useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 /60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  React.useEffect(()=>{
    setMillis(minutesToMillis(minutes));
  }, [minutes])

  React.useEffect(()=>{
    onProgress(millis / minutesToMillis(minutes));
    if(millis === 0){
      onEnd();
    }
  }, [millis])

  React.useEffect(()=>{
    if(isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return ()=>clearInterval(interval.current);
  }, [isPaused, countDown])

  return (
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: paddingSize.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  }
})