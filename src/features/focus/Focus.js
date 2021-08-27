import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton';
import {fontSize, paddingSize} from '../../utils/sizes';
import {colors} from '../../utils/colors';

export const Focus = ({addSubject}) => {
  const [tmpItem, setTmpItem] = React.useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on ?</Text>
        <View style={styles.inputContainer}>
          <TextInput 
          style={{flex:1, marginRight: 20}}
          onSubmitEditing={
            ({nativeEvent})=>{
            setTmpItem(nativeEvent.text)
          }}
          />
          <RoundedButton 
          size={fontSize.xxxl} 
          title='+'
          onPress={()=>addSubject(tmpItem)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer:{
    flex: 1,
    padding: paddingSize.md,
    justifyContent: 'center'
  },
  title:{
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  inputContainer:{
    paddingTop: paddingSize.md,
    flexDirection: 'row',
    alignItems: 'center',
  }
});