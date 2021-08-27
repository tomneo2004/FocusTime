import React from 'react';
import {View, Text, StyleSheet, Vibration, Platform} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';
import {colors} from '../../utils/colors';
import {spacing} from '../../utils/sizes';
import {paddingSize, fontSize} from '../../utils/sizes';
import {Countdown} from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import {Timing} from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({
  focusSubject,
  onTimerEnd,
  clearSubject,
  })=>{
  useKeepAwake();

  const [minutes, setMinutes] = React.useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = React.useState(false);
  const [progress ,setProgress] = React.useState(1);

  const onProgress = (progress) => {
    setProgress(progress) 
  }

  const vibrate = ()=> {
    if(Platform.OS === 'ios') {
      const interval = setInterval(()=>Vibration.vibrate(), 1000);
      setTimeout(()=>clearInterval(interval), 10000);
    }
    else {
      Vibration.vibrate(10000);
    }
  }

  const onChangeTime  = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  const onEnd = ()=> {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
        minutes={minutes} 
        isPaused={!isStarted} 
        onProgress={onProgress}
        onEnd={onEnd}
        />
      </View>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{paddingTop: paddingSize.xxl}}>
        <ProgressBar 
        progress={progress}
        color='#5e84e2'
        style={{height: 10}}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={onChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
      {isStarted?
        <RoundedButton title='pause' onPress={()=>setIsStarted(false)} />
        :
        <RoundedButton title='start' onPress={()=>setIsStarted(true)} />
      }
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title='-' size={fontSize.xxxl} onPress={()=>clearSubject()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  title:{
    color: colors.white,
    textAlign: 'center',
  },
  task:{
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown:{
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper:{
    flex:0.3,
    padding: paddingSize.md,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
  },
  clearSubject:{
    paddingBottom: paddingSize.lg,
    paddingLeft: paddingSize.lg
  }
})