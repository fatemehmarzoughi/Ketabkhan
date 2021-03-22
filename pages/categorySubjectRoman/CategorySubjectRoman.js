import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView , TouchableWithoutFeedback , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import styles from '../styleCategory.css'

export class CategorySubjectRoman extends React.Component{
    constructor(){
      super();
      this.state = {
        // ProductScreen : false,
        thisPageName : 'CategoryAll',
        // selectedId : 0 ,
        products : realm.objects("Books"),
        showingProducts : [],
      }
      this.state.showingProducts = [...this.state.products];
      realm = new Realm({
        path : 'Database.realm',
      })
    }

    //for searching filtering
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

    render(){
        return(
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Icon style={styles.bellIcon} name="bell" size={35} color='#333' />
                <Text style={styles.title} >رمان</Text>
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
                  onPress = {() => this.props.navigation.navigate("Product" , {id : item.id , page : 'CategorySubjectRoman'})}
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