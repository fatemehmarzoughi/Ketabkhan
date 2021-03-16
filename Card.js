import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';

export class Card extends React.Component{
    constructor(){
        super();
        this.state = {
            products : [
                {
                    id : 0,
                    name : "عاشقان هفت دریا",
                    subject : "عاشقانه",
                    price : 20000,
                    pages : 50,
                    age : "بزرگسال",
                    numbers : 1,

                },
                {
                    id : 1,
                    name : "راز ثروت",
                    subject : "علمی",
                    price : 50000,
                    pages : 68,
                    age : "بزرگسال",
                    numbers : 1,

                },
                {
                    id : 2,
                    name : "هزار داستان",
                    subject : "داستانی",
                    price : 70000,
                    pages : 500,
                    age : "نوجوان",
                    numbers : 1,

                }
            ]
        }
    }

    plus = (num , id) => {
        if(num < 10)
        {
            let FlatListItems = {...this.state.products};
            // alert(FlatListItems[id].numbers);
            FlatListItems[id].numbers = num + 1;
            this.setState({
                FlatListItems,
            })  
        }
    }

    minus = (num , id) => {
        if(num>1)
        {
            let FlatListItems = {...this.state.products};
            FlatListItems[id].numbers = num - 1;
            this.setState({
                FlatListItems,
            })  
        }
    }


    render(){
        return(
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                 <Icon onPress={() => this.props.navigation.openDrawer()} style={styles.menuIcon} name="navicon" size={35} color='#333' />
                 <Text style={styles.headerText}>سبد کالای من</Text>
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
                                <Text style={styles.explenation}>رده سنی : {item.age}</Text>
                                <Text style={styles.explenation}>دسته بندی موضوع : {item.subject}</Text>
                                <Text style={styles.explenation}>تعداد صفحات : {item.pages}</Text>
                                <Text style={styles.explenationB}>قیمت : {item.price} تومان</Text>
                                <View style={styles.numbers}>
                                   <Text style={styles.explenation}>تعداد :</Text> 
                                   <Icon style={styles.plusMinus} onPress={() => this.minus(item.numbers , item.id)} name="minus" size={35} color='#333' />
                                   <Text style={styles.explenationB}>{item.numbers}</Text>
                                   <Icon style={styles.plusMinus} onPress={() => this.plus(item.numbers , item.id)} name="plus" size={35} color='#333' />
                                </View>
                            </View>
                            <View style={styles.leftContent}>
                              <Image style={styles.img} source={require("./images/bookCover1.jpg")} />
                            </View>
                        </View>
                        <Text style={styles.btn}>حذف</Text>
                  </View>
              )}
              />
              <Text style={styles.buyBtn}>ادامه فرایند خرید</Text>
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
        paddingBottom : 65,
        flex : 1,
        backgroundColor : '#fff'
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
        marginTop : 15,
        borderRadius : 5,
    },
    plusMinus : {
        color : '#E16389'
    },
    buyBtn : {
        padding : 15,
        width : Dimensions.get('window').width,
        position : 'absolute',
        bottom : 0,
        backgroundColor : '#E16398',
        textAlign : 'center',
        color : '#fff',
        fontSize : 15,
    }
})