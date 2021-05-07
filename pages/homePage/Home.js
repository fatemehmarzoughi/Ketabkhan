import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView, TouchableOpacity , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from './styleHome.css';
import Realm from 'realm';

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

      isReadingList : realm.objects("Books").filtered('isReading = 1'),
      showingIsReading : [],
    }
    this.state.showingLoveProducts = [...this.state.loveProducts];
    this.state.showingScienceProducts = [...this.state.productsScience];
    this.state.showingRomanProducts = [...this.state.productsRoman];
    this.state.showingIsReading = [...this.state.isReadingList];

    realm = new Realm({
      path : 'Database.realm'
    })
    console.log(`showingIsReading= ${JSON.stringify(this.state.showingIsReading)}`)
  }

  openLeftSideBar = () => {
    Animated.timing(this.state.leftSideBarPosition , {
      toValue : 0,
      duration : 400,
    }).start()
  }

  closeLeftSideBar = () => {
    Animated.timing(this.state.leftSideBarPosition , {
      toValue : -90,
      duration : 400,
    }).start()
  }

  removeFromReadingList = (id) => {
    const db = realm.objects("Books");
    realm.write(() => {
      db[id].isReading = 0;
    })
    this.setState({
      showingIsReading : this.state.isReadingList
    })
  }

  render(){
    this.state.showingIsReading = [...this.state.isReadingList];
    return(
      <SafeAreaView className={styles.container}>
        <View style={styles.header}>
          <Icon style={styles.bellIcon} onPress={() => this.openLeftSideBar()} name="clock" size={40} color='#333' />
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
        <Animated.View style={[styles.leftSideBar , {translateX : this.state.leftSideBarPosition}]}>
          <TouchableWithoutFeedback onPress={() => this.closeLeftSideBar()} style={styles.closeIcon}><Icon name="close" size={30} color='#333' /></TouchableWithoutFeedback>
          <SafeAreaView style={{paddingBottom : 100}} >
            <FlatList 
              data={this.state.showingIsReading}
              keyExtractor={(item, index) => index.toString()}
              style={{marginTop : 20}}
              renderItem = {({item}) => (
                <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Product' , {id : item.id , page : 'Home'})}>
                  <Icon onPress={() => this.removeFromReadingList(item.id)} name="close" size={20} color='#333' />                  
                  <Image style={styles.readingListItem} source={{uri : item.imagePath}} />
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Animated.View>
      </SafeAreaView>
    )
  }
}