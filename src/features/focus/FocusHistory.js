import React from 'react';
import {View, StyleSheet, FlatList, Text, SafeAreaView} from 'react-native';
import {fontSize, spacing} from '../../utils/sizes';
import {RoundedButton} from '../../components/RoundedButton';

export const FocusHistory = ({focusHistory, onClear}) => {
  const clearHistory = () => {
    onClear();
  } 

  const HistoryItem = ({item, index}) => (
    <Text style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  )

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.title}>Things we focused on</Text>
        {!!focusHistory.length && (
          <>
            <FlatList 
            style={{flex: 1}}
            contentContainerStyle={{flex: 1, alignItems: 'center'}}
            data={focusHistory}
            renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton 
              size={75}
              title='Clear'
              onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  historyItem: (status)=>({
    color: status > 1? 'red':'green',
    fontSize: fontSize.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSize.lg,
    textAlign: 'center',
  },
  clearContainer:{
    alignItems: 'center',
    padding: spacing.md,
  }
})