import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView, TouchableOpacity} from 'react-native';
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

      isReadingList : 
[        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        },
        {
          imagePath : 'https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg'
        }]
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
                 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Product' , {id : item.id, page : "Home" })} style={styles.popularProduct}>
                   <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
                 </TouchableOpacity>
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
        <View style={styles.leftSideBar}>
          <View style={styles.closeIcon}><Icon name="close" size={30} color='#333' /></View>
          <SafeAreaView style={{paddingBottom : 100}} >
            <FlatList 
              data={this.state.showingRomanProducts}
              keyExtractor={(item, index) => index.toString()}
              style={{marginTop : 20}}
              renderItem = {({item}) => (
                <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Product' , {id : item.id , page : 'Home'})}>
                  <Icon name="close" size={28} color='#333' />
                  <Image style={styles.readingListItem} source={{uri : item.imagePath}} />
                </TouchableOpacity>
              )}
            />
          </SafeAreaView >
        </View >
      </SafeAreaView>
    )
  }
}