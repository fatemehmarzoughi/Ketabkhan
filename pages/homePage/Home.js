import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView, TouchableOpacity , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from './styleHome.css';
import Realm from 'realm';
import {LeftSideBar} from '../leftSideBar';

console.disableYellowBox = true;
export class Home extends React.Component{

  constructor(props)
  {
    super(props);

    this.state = {

      leftSideBarPosition : new Animated.Value(-90),
      
      loveProducts : realm.objects("Books").filtered('categorySubject = 0'),
      showingLoveProducts : [],

      productsScience : realm.objects("Books").filtered('categorySubject = 2'),
      showingScienceProducts : [],

      productsRoman : realm.objects("Books").filtered('categorySubject = 1'),
      showingRomanProducts : [],

      productsChildrenTeenage : realm.objects("Books").filtered('categoryAge = 0 or categoryAge = 1'),
      showingProductsChildrenTeenage : [],

      isReadingList : realm.objects("Books").filtered('isReading = 1'),
      showingIsReading : [],
    }
    this.state.showingLoveProducts = [...this.state.loveProducts];
    this.state.showingScienceProducts = [...this.state.productsScience];
    this.state.showingRomanProducts = [...this.state.productsRoman];
    this.state.showingIsReading = [...this.state.isReadingList];
    this.state.showingProductsChildrenTeenage = [...this.state.productsChildrenTeenage];

    realm = new Realm({
      path : 'Database.realm'
    })
  }

  render(){
    this.state.showingIsReading = [...this.state.isReadingList];
    return(
      <SafeAreaView className={styles.container}>
        <LeftSideBar style={{zIndex : 122}} navigation={this.props.navigation} page='Home'/>
        <ScrollView>
          {/* <View style={styles.searchContainer}>
            <TextInput 
             style={styles.searchInput}
             placeholder = "نام کتاب یا نام نویسنده"
            />
          </View> */}
          <View style={[styles.popularContainer ,  {paddingTop : 50}]}>
            <Text style={styles.popularText}>علمی-تخیلی</Text>
            <SafeAreaView>                                                                                                                                                                                                                                                                                                                                                                                                                                            
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.showingScienceProducts}
               style={styles.popularProducts}
               inverted={true}
               renderItem={({item}) => (
                 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Product' , {id : item.id, page : "Home" })} style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
                 </TouchableOpacity>
               )}
              />
            </SafeAreaView>
          </View>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>عاشقانه-عارفانه</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.showingLoveProducts}
               style={styles.popularProducts}
               inverted={true}
               renderItem={({item}) => (
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Product' , {id : item.id , page : "Home"})} style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
                 </TouchableOpacity>
               )}
              />
            </SafeAreaView>
          </View>
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>کودکان و نوجوانان</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.showingProductsChildrenTeenage}
               style={styles.popularProducts}
               inverted={true}
               renderItem={({item}) => (
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Product' , {id : item.id , page : "Home"})} style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
                 </TouchableOpacity>
               )}
              />
            </SafeAreaView>
          </View>
          <View style={[styles.popularContainer , {paddingBottom : 50}]}>
            <Text style={styles.popularText}>رمان و داستان</Text>
            <SafeAreaView>
              <FlatList 
               horizontal
               keyExtractor={(item, index) => index.toString()}
               data={this.state.showingRomanProducts}
               style={styles.popularProducts}
               inverted={true}
               renderItem={({item}) => (
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Product' , {id : item.id , page : "Home"})} style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
                 </TouchableOpacity>
               )}
              />
            </SafeAreaView>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}