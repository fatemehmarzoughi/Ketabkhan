import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
// import { super } from '@babel/types';

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
    
    // componentDidMount(){
        // this.setState({
        //     products : realm.objects("Books").filtered("isLike = 1")
        // })   
        // this.forceUpdate();
    // }
    // shouldComponentUpdate(){
    //     this.forceUpdate();
    // }
    // componentWillReceiveProps(){
    //     this.setState({
    //         products : realm.objects("Books").filtered("isLike = 1")
    //     })   
    // }
    
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
                              <Image style={styles.img} source={require("./images/bookCover1.jpg")} />
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


const styles = StyleSheet.create({
    productsStyle : {
        // flex : 1,
        // justifyContent : 'center',
        // alignItems : 'center'
    },
    container : {
        // paddingBottom : 65,
        flex : 1,
    },
    // productsStyle : {
    //     marginBottom : 100,
    // },
    header : {
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row-reverse',
        marginTop : 20,
        paddingBottom : 10,
        // position : 'fixed',
        // top : 0,
    },
    headerText : {
        color : 'black',
        fontSize : 18,
    },
    bellIcon : {
        marginLeft : 22,
        color : '#E16389',
    },
    menuIcon : {
        marginRight : 22,
        color : '#E16389',
    },
    productBox : {
        width : Dimensions.get('window').width - 60,
        margin : 30,
        marginBottom : 10,
        borderWidth : 1,
        borderStyle : 'solid',
        borderColor : '#E16389',
        padding : 5,
        // flexDirection : 'row-reverse',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderRadius : 5,
    },
    content : {
        width : Dimensions.get('window').width - 70,
        flexDirection : 'row-reverse',
        alignItems : 'center',
        justifyContent : 'space-evenly',
    },
    explenation : {
        fontSize : 13,
        padding : 2,
    },
    explenationB : {
        fontSize : 14,
        fontWeight : 'bold',
        padding : 2,
    },
    numbers : {
        flex : 1,
        alignItems : 'flex-end',
        flexDirection : 'row-reverse',
        justifyContent : 'flex-start',
    },
    img : {
        width : 115,
        // alignItems : 'flex-start',
        height : 175,
    },
    btn : {
        padding : 10,
        width : Dimensions.get('window').width - 75,
        backgroundColor : '#e9e9e9',
        textAlign : 'center',
        color : '#6E6E6DFF',
        borderWidth : 1,
        borderStyle : 'solid',
        borderColor : '#E16389',
        marginTop : 5,
        borderRadius : 5,
    },
    plusMinus : {
        color : '#E16389'
    },
    buyBtn : {
        padding : 10,
        width : Dimensions.get('window').width - 75,
        backgroundColor : '#E16389',
        textAlign : 'center',
        color : '#fff',
        borderWidth : 1,
        borderStyle : 'solid',
        borderColor : '#E16389',
        marginTop : 15,
        borderRadius : 5,
    }
})