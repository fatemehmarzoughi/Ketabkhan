import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import styles from './styleHome.css';
import Realm from 'realm';

export class Home extends React.Component{

  constructor(props)
  {
    super(props);

    this.state = {
      
      loveProducts : realm.objects("Books").filtered('categorySubject = 0'),
      showingLoveProducts : [],

      productsScience : realm.objects("Books").filtered('categorySubject = 2'),
      showingScienceProducts : [],

      productsRoman : realm.objects("Books").filtered('categorySubject = 1'),
      showingRomanProducts : [],

    }
    this.state.showingLoveProducts = [...this.state.loveProducts];
    this.state.showingScienceProducts = [...this.state.productsScience];
    this.state.showingRomanProducts = [...this.state.productsRoman];
    realm = new Realm({
      path : 'Database.realm'
    })
    console.log(`showingScienceProducts = ${this.state.showingScienceProducts}`)
    console.log(`showingLoveProducts = ${this.state.showingLoveProducts}`)
    console.log(`showingRomanProducts = ${this.state.showingRomanProducts}`)
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
            <Text style={styles.popularText}> علمی</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.showingScienceProducts}
               style={styles.popularProducts}
               inverted={true}
               renderItem={({item}) => (
                 <View style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
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
               data={this.state.showingLoveProducts}
               style={styles.popularProducts}
               inverted={true}
               renderItem={({item}) => (
                 <View style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
                 </View>
               )}
              />
            </SafeAreaView>
          </View>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>رمان و داستان</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.showingRomanProducts}
               style={styles.popularProducts}
               inverted={true}
               renderItem={({item}) => (
                 <View style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
                 </View>
               )}
              />
            </SafeAreaView>
          </View>
          {/* <View style={styles.popularContainer}>
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
          </View> */}
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