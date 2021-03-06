import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import {Focus} from './src/features/focus/Focus';
import {FocusHistory} from './src/features/focus/FocusHistory';
import {Timer} from './src/features/timer/Timer';
import {colors} from './src/utils/colors';
import {spacing} from './src/utils/sizes';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
}

export default function App() {
  const [focusSubject, setFocusSubject] = React.useState(null);
  const [focusHistory, setFocusHistory] = React.useState([]);

  const addFocusSubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {
      key: String(focusHistory.length + 1), 
      subject, 
      status
      }]);
  }

  const onClear = () => {
    setFocusHistory([]);
  }

  const saveFocusHistory = async () => {
    try{
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    }
    catch (e){
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem('focusHistory');

      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    }
    catch(e){
      console.log(e);
    }  
  }

  React.useEffect(()=>{
    loadFocusHistory();
  }, [])

  React.useEffect(()=>{
    saveFocusHistory();
  }, [focusHistory])

  return (
    <View style={styles.container}>
    {focusSubject?
      <Timer 
      focusSubject={focusSubject} 
      onTimerEnd={()=>{
        addFocusSubjectWithState(focusSubject, STATUSES.COMPLETE);
        setFocusSubject(null);
      }}
      clearSubject={()=>{
        addFocusSubjectWithState(focusSubject, STATUSES.CANCELLED);
        setFocusSubject(null);
      }}
      />
    :
      <View style={{flex: 1}}>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory 
        focusHistory={focusHistory} 
        onClear={onClear}
        />
      </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios'? spacing.md:spacing.lg,
    backgroundColor: colors.darkblue,
  }
});
