import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer ,  useIsFocused} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SidebarMenu  from "./SidebarMenu.js";
import { Home } from "./homePage/Home.js";
import { CategoryAll } from "./categoryPages/CategoryAll.js";
import { CategoryAgeChildren } from "./categoryPages/CategoryAgeChildren.js";
import { CategoryAgeAdult } from "./categoryPages/CategoryAgeAdult.js";
import { CategoryAgeTeenage } from "./categoryPages/CategoryAgeTeenage.js";
import { CategorySubjectLovely } from "./categoryPages/CategorySubjectLovely.js";
import { CategorySubjectRoman } from "./categoryPages/CategorySubjectRoman.js";
import { CategorySubjectScience } from "./categoryPages/CategorySubjectScience.js";
import { Likes } from "./likesPage/Likes";
import {Product} from './productPage/Product.js';
import {PDFViewPage} from './productPage/PDFViewPage.js';
import {realm} from '../data/realmConnection';
import {writeData} from '../data/write';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export class MainPage extends React.Component{
  constructor()
  {
    super();
    this.state = {
    }
    console.log(`realm.objects('Books') = ${realm.objects('Books')[0]}`);
    if(realm.objects('Books')[0] === undefined)
      writeData();
  }

  render(){
    const HomeScreen = ({navigation}) => {
      return (<Home navigation={navigation} isFocused={useIsFocused()}/>)
    }
    const CategoryAllScreen = ({navigation}) => {
      return (<CategoryAll navigation={navigation} isFocused={useIsFocused()} />)
    }
    const CategoryAgeChildrenScreen = ({navigation}) => {
      return (<CategoryAgeChildren navigation={navigation} isFocused={useIsFocused()} />)
    }
    const CategoryAgeAdultScreen = ({navigation}) => {
      return (<CategoryAgeAdult navigation={navigation} isFocused={useIsFocused()} />)
    }
    const CategoryAgeTeenageScreen = ({navigation}) => {
      return (<CategoryAgeTeenage navigation={navigation} isFocused={useIsFocused()} />)
    }
    const CategorySubjectRomanScreen = ({navigation}) => {
      return (<CategorySubjectRoman navigation={navigation} isFocused={useIsFocused()} />)
    }
    const CategorySubjectLovelyScreen = ({navigation}) => {
      return (<CategorySubjectLovely navigation={navigation} isFocused={useIsFocused()} />)
    }
    const CategorySubjectScienceScreen = ({navigation}) => {
      return (<CategorySubjectScience navigation={navigation} isFocused={useIsFocused()} />)
    }
    const LikesScreen = ({navigation}) => {
      return (<Likes navigation={navigation} isFocused={useIsFocused()} />)
    }
    const ProductScreen = ({navigation}) => {
      return (<Product navigation={navigation} isFocused={useIsFocused()} />)
    }

    const PDFViewPageScreen = ({navigation}) => {
      return (<PDFViewPage navigation={navigation} />)
    }
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
          <Drawer.Screen name="PDFViewPage" component={PDFViewPageScreen} />

          <Drawer.Screen name="Likes" component={LikesScreen} />

        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
const styles = StyleSheet.create({
});