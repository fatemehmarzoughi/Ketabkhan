import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView , TouchableWithoutFeedback , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import { Product } from './Product.js';
// import Animated from 'react-native-reanimated';

export class CategoryAll extends React.Component{
    constructor(){
        super();
        this.state = {
            ProductScreen : false,
            thisPageName : 'CategoryAll',
            selectedId : 0 ,
            // products : [
            //     {
            //         id : 0,
            //         name : "عاشقان هفت دریا",
            //         subject : "عاشقانه",
            //         price : 20000,
            //         pages : 50,
            //         age : "بزرگسال",
            //         numbers : 1,
            //         writer : "Jozeph"

            //     },
            //     {
            //         id : 1,
            //         name : "راز ثروت",
            //         subject : "علمی",
            //         price : 50000,
            //         pages : 68,
            //         age : "بزرگسال",
            //         numbers : 1,
            //         writer : "Dr.H"
            //     },
            //     {
            //         id : 2,
            //         name : "هزار داستان",
            //         subject : "داستانی",
            //         price : 70000,
            //         pages : 500,
            //         age : "نوجوان",
            //         numbers : 1,
            //         writer : "مولوی"
            //     },
            //     {
            //         id : 3,
            //         name : "هزار و یک شب",
            //         subject : "داستانی",
            //         price : 70000,
            //         pages : 500,
            //         age : "بزرگسال",
            //         numbers : 1,
            //         writer : "دهخدا"
            //     },
            //     {
            //         id : 4,
            //         name : "هزار و یک شب",
            //         subject : "داستانی",
            //         price : 70000,
            //         pages : 500,
            //         age : "بزرگسال",
            //         numbers : 1,
            //         writer : "دهخدا"
            //     }
            // ],
            products : realm.objects("Books"),
            showingProducts : [],
            searchBarPosition : new Animated.Value(-85),
            openOrCloseSearchBar : 0,
          }
        this.state.showingProducts = [...this.state.products];
        realm = new Realm({
          path : 'Database.realm',
        })
    }

    contain = (item, query) => {
      const {name , writer} = item;
      if(name.includes(query) || writer.includes(query))
        return true;
      else
        return false;
    }

    handleChange = (text) => {
      const filtering = this.state.products.filter(item => {
        return this.contain(item , text);
      })
      
      this.setState({
        showingProducts : filtering ,
      })
    }

    goToPage = (itemId) => {
      this.setState({
        ProductScreen : true,
        selectedId : itemId,
      })
    }

    openCloseSearchBar = () => {
      switch(this.state.openOrCloseSearchBar)
      {
        case 0 : 
        Animated.timing(this.state.searchBarPosition , {
          toValue : 0,
          duration : 200,
          useNativeDriver: false
        }).start();
        this.setState({
          openOrCloseSearchBar : this.state.openOrCloseSearchBar + 1,
        })
        break;
        case 1 : 
        Animated.timing(this.state.searchBarPosition , {
          toValue : -85,
          duration : 200,
          useNativeDriver: false
        }).start();
        this.setState({
          openOrCloseSearchBar : this.state.openOrCloseSearchBar - 1,
        })
        break;
      }
      // alert(this.state.openOrCloseSearchBar)
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Icon onPress={() => this.openCloseSearchBar()} style={styles.bellIcon} name="bell" size={35} color='#333' />
                <Text style={styles.title} >همه دسته ها</Text>
                <Icon onPress={() => this.props.navigation.openDrawer()} style={styles.menuIcon} name="navicon" size={35} color='#333' />
              </View>
              <Animated.View style={[styles.searchContainer, {transform : [{translateY : this.state.searchBarPosition}]}]}>
                <TextInput 
                 style={[styles.searchInput ]}
                 placeholder = "نام کتاب یا نام نویسنده"
                 onChangeText = {(text) => this.handleChange(text)}

                />
                {/* <Icon style={styles.searchIcon} name="search" size={35} color='#333' /> */}
              </Animated.View>
              <FlatList 
               data={this.state.showingProducts}
               keyExtractor={(item, index) => index.toString()}
               style={[styles.popularProducts]}
               showsVerticalScrollIndicator={false}
               renderItem={({item}) => (
                 <TouchableWithoutFeedback 
                  onPress = {() => this.props.navigation.navigate("Product" , {id : item.id , page : 'CategoryAll'})}
                  style={[styles.popularProduct]}>
                   <Animated.View style={[styles.popularProduct , {transform : [{translateY : this.state.searchBarPosition}]}]}>
                     <Image style={styles.popularImgProduct} source={require('./images/bookCover1.jpg')} />
                     <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subTitle}>نویسنده : {item.writer}</Text>
                     </View>
                   </Animated.View>
                 </TouchableWithoutFeedback>
               )}
              />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex : 1,
    },
    header : {
      alignItems : 'center',
      justifyContent : 'space-between',
      flexDirection : 'row',
      paddingTop : 20,
      paddingBottom : 10,
      backgroundColor : "#fff",
      // position : 'fixed'
    },
    title : {
    //   marginLeft : 25,
      fontSize : 15,
      color : '#5B5255',
    },
    subTitle : {
      fontSize : 12,
    },
    menuIcon : {
      marginRight : 22,
      color : '#E16389',
    },
    bellIcon : {
      marginLeft : 22,
      color : '#E16389',
    },
    searchContainer : {
      position : 'relative',
      margin : 24,
      zIndex : -1,
    },
    searchInput : {
      //margin: 24,
      backgroundColor : "#f5f5f5",
      borderRadius : 10,
      padding : 15,
      // position : 'absolute',
      // top : -75,


    },
    searchIcon : {
      position : 'absolute',
      top : 13,
      left : 7,
      color : '#E16389'
    },
    popularContainer : {
      margin : 24,
      paddingBottom : 65,
      flex : 1,
      marginTop : 0,
      zIndex : 45,
      // backgroundColor:'red',
      // position : 'absolute'
    },
    popularText : {
      fontSize : 16,
    },
    popularProducts : {
        margin : 24,
        zIndex : 34,
        // flex : 1,
        // backgroundColor : 'red',
        marginTop : 0,
        // position : 'absolute',
        marginBottom : 0,
        paddingTop : 100,
        position : 'relative'
    },
    popularProduct : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between',
      margin : 5,
      borderStyle : 'solid',
      borderColor : '#E16398',
      borderWidth : 1,
      borderRadius : 10,
      padding : 5,
    },
    popularImgProduct : {
      height : 55,
      borderRadius : 5,
      width : 35,
    },
    categoryView : {
      margin : 30,
      alignItems : 'center',
      justifyContent : 'center',
      marginRight : 0,
    },
    categoryIcon : {
      margin : 0,
      padding : 5,
      color : "#E16389",
    },
    categoryContainer : {
      marginTop : 0,
      marginBottom: 10,
      flexDirection : 'row-reverse'
    }
  
  });
  