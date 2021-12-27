import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../Config/Colors';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

export default Card;
