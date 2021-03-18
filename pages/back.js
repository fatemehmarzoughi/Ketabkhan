import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image , Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
// import {CategoryAll} from './CategoryAll.js'



function Back(props){

    return(<Icon onPress={props.customClick} style={styles.backIcon} name="chevron-left" size={30} color='black' />)
    
}

const styles = StyleSheet.create({
    backIcon : {
        padding : 0,
        margin : 0,
        fontWeight : 'bold',
    }
})

export default Back;