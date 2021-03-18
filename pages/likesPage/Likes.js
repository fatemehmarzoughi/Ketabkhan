import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
// import { super } from '@babel/types';
import styles from './styleLikes.css'

export class Likes extends React.Component{
    
    constructor(){
        super();
        // var dataFiltering = realm
        //     .objects("Books")
        //     .filtered("isLike = 1")
        this.state = {
            products : realm.objects("Books").filtered("isLike = 1"),
        }
    }
    
    setCategoryAge = (categoryAge) => {
        switch(categoryAge)
        {
            case 0 : 
            return "کودک";
            break; 
            case 1 : 
            return "نوجوان";
            break;
            case 2 : 
            return "بزرگسال";
            break;
        }
    }

    setCategorySubject = (categorySubject) => {
        switch(categorySubject)
        {
            case 0 : 
            return "عاشقانه";
            break; 
            case 1 : 
            return "عارفانه";
            break;
            case 2 : 
            return "رمان";
            break;
            case 3 : 
            return "داستانی";
            break;
            case 4 : 
            return "علمی";
            break;
        }
    }

    render(){
        // this.state.products;
        return(
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                 <Icon onPress={() => this.props.navigation.openDrawer()} style={styles.menuIcon} name="navicon" size={35} color='#333' />
                 <Text style={styles.headerText}>مورد علاقه های من</Text>
                 <Icon style={styles.bellIcon} name="bell" size={35} color='#333' />
              </View>
              <FlatList 
               style={styles.productsStyle}
               keyExtractor={(item, index) => index.toString()}
               data={this.state.products}
               renderItem = {({item}) => (
                  <View style={styles.productBox}>
                        <View style={styles.content}>
                            <View style={styles.rightContent}>
                                <Text style={styles.explenationB}>{item.name}</Text>
                                <Text style={styles.explenation}>رده سنی : {this.setCategoryAge(item.categoryAge)}</Text>
                                <Text style={styles.explenation}>دسته بندی موضوع : {this.setCategorySubject(item.categorySubject)}</Text>
                                <Text style={styles.explenation}>تعداد صفحات : {item.pages}</Text>
                                {/* <Text style={styles.explenationB}>قیمت : {item.price} تومان</Text> */}
                            </View>
                            <View style={styles.leftContent}>
                              <Image style={styles.img} source={require("../../images/bookCover1.jpg")} />
                            </View>
                        </View>
                        <Text style={styles.buyBtn}>افزودن به سبد خرید</Text>
                        <Text style={styles.btn}>حذف</Text>
                  </View>
              )}
              />
            </SafeAreaView>
        )
    }
}