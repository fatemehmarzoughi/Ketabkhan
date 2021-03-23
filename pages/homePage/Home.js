import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import styles from './styleHome.css'

export class Home extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      FlatListItems : [
        {
          requireImg : require("../../images/bookCover1.jpg"),
        },
        {
          requireImg : require("../../images/bookCover1.jpg"),
        },
        {
          requireImg : require("../../images/bookCover1.jpg"),
        },
        {
          requireImg : require("../../images/bookCover1.jpg"),
        },
        {
          requireImg : require("../../images/bookCover1.jpg"),
        },
        {
          requireImg : require("../../images/bookCover1.jpg"),
        },
      ]
    }
  }

  render(){
    return(
      <SafeAreaView className={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.bellIcon} name="bell" size={35} color='#333' />
          <Text style={styles.title} >کتابخوان</Text>
          <Icon onPress={() => this.props.navigation.openDrawer()} style={styles.menuIcon} name="navicon" size={35} color='#333' />
        </View>
        <ScrollView>
          <View style={styles.searchContainer}>
            <TextInput 
             style={styles.searchInput}
             placeholder = "نام کتاب یا نام نویسنده"
            />
          </View>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>علمی</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.FlatListItems}
               style={styles.popularProducts}
               showsHorizontalScrollIndicator={false}
               renderItem={({item}) => (
                 <View style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={item.requireImg} />
                 </View>
               )}
              />
            </SafeAreaView>
          </View>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>فلسفی</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.FlatListItems}
               style={styles.popularProducts}
               showsHorizontalScrollIndicator={false}
               renderItem={({item}) => (
                 <View style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={item.requireImg} />
                 </View>
               )}
              />
            </SafeAreaView>
          </View>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>درسی</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.FlatListItems}
               style={styles.popularProducts}
               showsHorizontalScrollIndicator={false}
               renderItem={({item}) => (
                 <View style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={item.requireImg} />
                 </View>
               )}
              />
            </SafeAreaView>
          </View>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>عاشقانه</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.FlatListItems}
               style={styles.popularProducts}
               showsHorizontalScrollIndicator={false}
               renderItem={({item}) => (
                 <View style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={item.requireImg} />
                 </View>
               )}
              />
            </SafeAreaView>
          </View>
          {/* <View style={styles.popularContainer}>
            <Text style={styles.popularText}>دسته بندی ها</Text>
            <ScrollView style={styles.categoryContainer} horizontal>
            <View style={styles.categoryView}>
              <Icon style={styles.categoryIcon} name="heart" size={35} color='#333' />
              <Text>عاشقانه</Text>
            </View>
            <View style={styles.categoryView}>
              <Icon style={styles.categoryIcon} name="heart" size={35} color='#333' />
              <Text>درسی</Text>
            </View>
            <View style={styles.categoryView}>
              <Icon style={styles.categoryIcon} name="heart" size={35} color='#333' />
              <Text>فلسفی</Text>
            </View>
            <View style={styles.categoryView}>
              <Icon style={styles.categoryIcon} name="heart" size={35} color='#333' />
              <Text>علمی</Text>
            </View>
          </ScrollView>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    )
  }
}