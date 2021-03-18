import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView , TouchableWithoutFeedback , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import styles from './styleCategoryAll.css'
// import { Product } from './Product.js';
// import Animated from 'react-native-reanimated';

export class CategoryAll extends React.Component{
    constructor(){
        super();
        this.state = {
            ProductScreen : false,
            thisPageName : 'CategoryAll',
            selectedId : 0 ,
            products : realm.objects("Books"),
            showingProducts : [],
            // searchBarPosition : new Animated.Value(-85),
            // openOrCloseSearchBar : 0,
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

    // openCloseSearchBar = () => {
    //   switch(this.state.openOrCloseSearchBar)
    //   {
    //     case 0 : 
    //     Animated.timing(this.state.searchBarPosition , {
    //       toValue : 0,
    //       duration : 200,
    //       useNativeDriver: false
    //     }).start();
    //     this.setState({
    //       openOrCloseSearchBar : this.state.openOrCloseSearchBar + 1,
    //     })
    //     break;
    //     case 1 : 
    //     Animated.timing(this.state.searchBarPosition , {
    //       toValue : -85,
    //       duration : 200,
    //       useNativeDriver: false
    //     }).start();
    //     this.setState({
    //       openOrCloseSearchBar : this.state.openOrCloseSearchBar - 1,
    //     })
    //     break;
    //   }
    //   // alert(this.state.openOrCloseSearchBar)
    // }

    render(){
        return(
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Icon onPress={() => this.openCloseSearchBar()} style={styles.bellIcon} name="bell" size={35} color='#333' />
                <Text style={styles.title} >همه دسته ها</Text>
                <Icon onPress={() => this.props.navigation.openDrawer()} style={styles.menuIcon} name="navicon" size={35} color='#333' />
              </View>
              <View style={styles.searchContainer}>
                <TextInput 
                 style={[styles.searchInput ]}
                 placeholder = "نام کتاب یا نام نویسنده"
                 onChangeText = {(text) => this.handleChange(text)}
                />
                {/* <Icon style={styles.searchIcon} name="search" size={35} color='#333' /> */}
              </View>
              <FlatList 
               data={this.state.showingProducts}
               keyExtractor={(item, index) => index.toString()}
               style={[styles.popularProducts]}
               showsVerticalScrollIndicator={false}
               renderItem={({item}) => (
                 <TouchableWithoutFeedback 
                  onPress = {() => this.props.navigation.navigate("Product" , {id : item.id , page : 'CategoryAll'})}
                  style={[styles.popularProduct]}>
                   <View style={styles.popularProduct}>
                     <Image style={styles.popularImgProduct} source={require('../../images/bookCover1.jpg')} />
                     <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subTitle}>نویسنده : {item.writer}</Text>
                     </View>
                   </View>
                 </TouchableWithoutFeedback>
               )}
              />
            </SafeAreaView>
        )
    }
}