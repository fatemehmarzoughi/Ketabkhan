import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer ,  useIsFocused} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SidebarMenu  from "./SidebarMenu.js";
import { Home } from "./homePage/Home.js";
import { CategoryAll } from "./categoryAllPage/CategoryAll.js";
import { CategoryAgeChildren } from "./categoryAgeChildren/CategoryAgeChildren.js";
import { CategoryAgeAdult } from "./categoryAgeAdult/CategoryAgeAdult.js";
import { CategoryAgeTeenage } from "./categoryAgeTeenage/CategoryAgeTeenage.js";
import { CategorySubjectLovely } from "./categorySubjectLovely/CategorySubjectLovely.js";
import { CategorySubjectRoman } from "./categorySubjectRoman/CategorySubjectRoman.js";
import { CategorySubjectScience } from "./categorySubjectScience/CategorySubjectScience.js";
import { Card } from "./cardPage/Card.js";
import { Likes } from "./likesPage/Likes.js";
import {Product} from './productPage/Product.js';
// import console = require('console');

// console.disableYellowBox = false;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export class MainPage extends React.Component{
  constructor()
  {
    super();
    this.state = {
    }
  }

  render(){
    const HomeScreen = ({navigation}) => {
      return (<Home navigation={navigation} />)
    }
    const CategoryAllScreen = ({navigation}) => {
      return (<CategoryAll navigation={navigation} />)
    }
    const CategoryAgeChildrenScreen = ({navigation}) => {
      return (<CategoryAgeChildren navigation={navigation} />)
    }
    const CategoryAgeAdultScreen = ({navigation}) => {
      return (<CategoryAgeAdult navigation={navigation} />)
    }
    const CategoryAgeTeenageScreen = ({navigation}) => {
      return (<CategoryAgeTeenage navigation={navigation} />)
    }
    const CategorySubjectRomanScreen = ({navigation}) => {
      return (<CategorySubjectRoman navigation={navigation} />)
    }
    const CategorySubjectLovelyScreen = ({navigation}) => {
      return (<CategorySubjectLovely navigation={navigation} />)
    }
    const CategorySubjectScienceScreen = ({navigation}) => {
      return (<CategorySubjectScience navigation={navigation} />)
    }
    // const CardScreen = ({navigation}) => {
    //   return (<Card navigation={navigation} />)
    // }
    const LikesScreen = ({navigation}) => {
      return (<Likes navigation={navigation} isFocused={useIsFocused()} />)
    }
    const ProductScreen = ({navigation}) => {
      return (<Product navigation={navigation} isFocused={useIsFocused()} />)
    }
    // const isFocused = useIsFocused();
    return(
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" 
          drawerPosition = 'right'
          drawerContent={(props) => <SidebarMenu drawerItems={this.state.drawerItemsMain} {...props} />}
          drawerStyle = {{width : Dimensions.get('window').width/1.4 , color : '#fff'}}
          drawerContentOptions={{
            activeTintColor: '#fff',
            inactiveTintColor : '#fff',
            itemStyle : {},
            labelStyle : {textAlign : 'right', fontSize : 15, color : '#fff'}
          }}
          >
          <Drawer.Screen name="Home" component={HomeScreen}/>

          <Drawer.Screen name="CategoryAll" component={CategoryAllScreen} />

          <Drawer.Screen name="CategoryAgeChildren" component={CategoryAgeChildrenScreen} />
          <Drawer.Screen name="CategoryAgeAdult" component={CategoryAgeAdultScreen} />
          <Drawer.Screen name="CategoryAgeTeenage" component={CategoryAgeTeenageScreen} />

          <Drawer.Screen name="CategorySubjectLovely" component={CategorySubjectLovelyScreen} />
          <Drawer.Screen name="CategorySubjectRoman" component={CategorySubjectRomanScreen} />
          <Drawer.Screen name="CategorySubjectScience" component={CategorySubjectScienceScreen} />

          <Drawer.Screen key="Product" name="Product" component={ProductScreen}  />

          <Drawer.Screen name="Likes" component={LikesScreen} />
          {/* <Drawer.Screen name="Card" component={CardScreen} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
const styles = StyleSheet.create({
});