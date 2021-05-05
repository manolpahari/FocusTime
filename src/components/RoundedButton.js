import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';



export const RoundedButton = ({
  style={},
  textStyle={},
  size=125,
  ...props
}) => {
  return(
    <TouchableOpacity style={[styles(size).rounded, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = (size) => StyleSheet.create({
  rounded: {
    borderRadius: size/2,
    borderWidth: 2,
    borderColor: "#fff",
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: size/3,
    color: "#fff"
  }
})