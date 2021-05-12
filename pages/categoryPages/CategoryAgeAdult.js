import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView , TouchableWithoutFeedback , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import styles from './styleCategory.css';
import {realm} from '../../data/realmConnection';
import {LeftSideBar} from '../leftSideBar';

export class CategoryAgeAdult extends React.Component{
    constructor(){
        super();
        this.state = {
            ProductScreen : false,
            thisPageName : 'CategoryAll',
            selectedId : 0 ,
            //filtering data for adult category
            products : realm.objects("Books").filtered('categoryAge = 2'),
            showingProducts : [],
          }
        this.state.showingProducts = [...this.state.products];
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

    render(){
        return(
            <SafeAreaView style={styles.container}>
              <LeftSideBar style={{zIndex : 122}} navigation={this.props.navigation} page='CategoryAgeAdult'/>
              <View style={styles.searchContainer}>
                <TextInput 
                 style={[styles.searchInput ]}
                 placeholder = "نام کتاب یا نام نویسنده"
                 onChangeText = {(text) => this.handleChange(text)}
                />
              </View>
              <FlatList 
               data={this.state.showingProducts}
               keyExtractor={(item, index) => index.toString()}
               style={[styles.popularProducts]}
               showsVerticalScrollIndicator={false}
               renderItem={({item}) => (
                 <TouchableWithoutFeedback 
                  onPress = {() => this.props.navigation.navigate("Product" , {id : item.id , page : 'CategoryAgeAdult'})}
                  style={[styles.popularProduct]}>
                   <View style={styles.popularProduct}>
                     <Image style={styles.popularImgProduct} source={{uri : item.imagePath}} />
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