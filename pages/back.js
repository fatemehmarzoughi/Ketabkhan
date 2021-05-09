import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image , Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';



function Back(props){

    return(<Icon onPress={props.customClick} style={styles.backIcon} name="chevron-left" size={30} color='#E16398' />)
    
}

const styles = StyleSheet.create({
    backIcon : {
        padding : 0,
        margin : 0,
        fontWeight : 'bold',
    }
})

export default Back;