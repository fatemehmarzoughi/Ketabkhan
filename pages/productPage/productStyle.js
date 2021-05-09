import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
    container :{
        backgroundColor : '#fff',
        height : Dimensions.get('window').height,
    },
    header  :{
        backgroundColor : '#FAA5C2',
        paddingBottom : 30,
    },
    backGroundBackBtn  :{
        backgroundColor : '#fff',
        width : 30,
        height : 30,
        marginTop  : 30,
        marginLeft : 25,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
    },
    img  :{
        marginLeft : 'auto',
        marginRight : 'auto',
        width : 155,
        height : 230,
        borderRadius : 10,
    },
    likeBtn  :{
        width : 70,
        backgroundColor : '#fff',
        height : 70,
        alignItems : 'center',
        justifyContent :'center',
        borderRadius : 50,
        position : 'absolute',
        borderColor : '#FAA5C2',
        borderStyle : 'solid',
        borderWidth : 7,
        top : 265,
        left : 10,
    },
    bookName  :{
        fontSize : 24,
        color : 'black',
        marginTop  : 20,
        marginRight : 10,
        textAlign :'right'
    },
    bookWriter  :{
        color : '#7D7D81',
        marginRight : 10,
        textAlign : 'right',
    },
    bookDetails :{
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginRight : 10,
        marginLeft : 90,
        marginTop  : 10,
    },
    details  :{
        fontSize : 16,
        color : '#E16389'
    },
    detailsCategory  :{
        marginRight : 10,
        fontSize : 15,
        marginTop  : 10,
    },
    tabBar  :{
        flexDirection : 'row-reverse',
        justifyContent : 'flex-start',
        marginLeft : 5,
        marginRight : 10,
        marginTop  : 13,
        fontSize : 16,
    },
    tabsContainer  :{
        width : 2*Dimensions.get('window').width + 20,
        /* width: calc(100% - 20) , */
        // width: 100%,
        flexDirection : 'row',
        marginBottom : 60,
    },
    tabContent  :{
        /* width : Dimensionsget('window')width, */
        width: Dimensions.get('window').width,
        alignItems : 'flex-end',
        
    },
    underLine  :{
        borderTopWidth: 2,
        borderTopColor : 'black',
        borderStyle : 'solid',
        width : 30,
        height : 0,
        marginLeft : 'auto',
        
    },
    content  :{
        paddingRight : 13,
        paddingLeft : 13,
        paddingTop : 10,
        paddingBottom : 20,
    },
    readingBtn :{
        padding : 15,
        width : Dimensions.get('window').width,
        // width : 90%,
        position : 'absolute',
        bottom : 0,
        backgroundColor  :'#E16389',
        textAlign : 'center',
        color : '#ffffff',
        fontSize : 15,
        right: 0,
    },
    addToReadingBtn:{
        // width : 10%,
        width : Dimensions.get('window').width / 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E16389',
        padding : 15,
        position : 'absolute',
        bottom : 0,
        textAlign : 'center',
        color : '#E16389',
        fontSize : 15,
        zIndex: 1,
    },
    addToReadingBtnReaction:{
        position : 'absolute',
        bottom : 17,
        opacity: 0,
        left: 17,
    },
},)