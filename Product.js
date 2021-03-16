import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView , useParams , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import Back from './back.js'
import Realm from 'realm';
// import { TabView, SceneMap } from 'react-native-tab-view';
// let index = 0;
export class Product extends React.Component{
    constructor(props){
        realm = new Realm({
            path : 'Database.realm',
        });
        
        super(props);
        this.state = {
         products :  realm.objects("Books"),
         selectedProduct : [
            id = null,
            // name = null,
            // subject = null,
            // price = null,
            // pages = null,
            // age = null,
            // numbers = null,
            // writer = ""
          ],
          selectedId : null,
          tabNavigating : new Animated.Value(-Dimensions.get('window').width - 10),
          selectedTab0Color : 'black',
          selectedTab1Color : '#7D7D81',
          underLinePosition : new Animated.Value(10),
        }
    }

    setLike = () => {
        likeObjectUpdate = realm.objects("Books");
        realm.write(() => {
            //I have to changes this part of code to be able to like and unlike
            likeObjectUpdate[this.state.selectedId].isLike = 1;
        })
        alert('liked' + likeObjectUpdate[this.state.selectedId].isLike);
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

    navigateTab = (index) => {
        switch(index)
        {
            case 0 : 
               Animated.timing(this.state.tabNavigating , {
                   toValue : -Dimensions.get('window').width - 10,
                   duration : 400,
                   useNativeDriver: false
               }).start();
               Animated.timing(this.state.underLinePosition , {
                toValue : 10,
                duration : 300,
                useNativeDriver: false
               }).start();
               this.setState({
                   selectedTab0Color : 'black',
                   selectedTab1Color : '#7D7D81',
                //    underLinePosition : 10,
               })
            break;
            case 1 : 
            Animated.timing(this.state.tabNavigating , {
                toValue : -10 ,
                duration : 400,
                useNativeDriver: false
            }).start();
            Animated.timing(this.state.underLinePosition , {
                toValue : 90,
                duration : 300,
                useNativeDriver: false
            }).start();
            this.setState({
                selectedTab0Color : '#7D7D81',
                selectedTab1Color : 'black',
                // underLinePosition : 90,
            })
            break;
        }
        // alert('navigated')
    }

    render(){
        // this.forceUpdate()
         //getting selected product's id from the previouse page 
         const id = this.props.navigation.dangerouslyGetState().routes[2].params.id;
         console.log(this.props.navigation.dangerouslyGetState().routes);
         //finding out that where this page is comming from
         const page = this.props.navigation.dangerouslyGetState().routes[2].params.page;

         //finding the pruduct's features
        let length = this.state.products.length;
        //doing a search through the Pruducts And find the id of the selected product
        for(let i=0 ; i<length ; i++)
        {
            if(this.state.products[i].id === id)
            {
                this.state.selectedId = i;
                break;
            }
            else continue;
        }

        // saving founded features in the state of this page

        this.state.selectedProduct.id = this.state.products[this.state.selectedId].id;
        this.state.selectedProduct.age = this.state.products[this.state.selectedId].categoryAge;
        this.state.selectedProduct.name = this.state.products[this.state.selectedId].name;
        this.state.selectedProduct.subject = this.state.products[this.state.selectedId].categorySubject;
        // this.state.selectedProduct.price = this.state.products[this.state.selectedId].price;
        this.state.selectedProduct.pages = this.state.products[this.state.selectedId].pages;
        // this.state.selectedProduct.numbers = this.state.products[this.state.selectedId].numbers;
        this.state.selectedProduct.writer = this.state.products[this.state.selectedId].writer;



         return(
             <View style={styles.container}>
                <ScrollView>
                 <View style={styles.header}>
                    <View style={styles.backGroundBackBtn}>
                       <Back  style={styles.backGroundBackBtn} customClick={() => this.props.navigation.navigate(page)} />
                    </View>
                    <Image style={styles.img} source={require('./images/bookCover1.jpg')} />
                 </View>
                 <View style={styles.likeBtn}>
                     <Icon onPress={() => this.setLike()} name="heart" size={35} color='#333' />
                </View>
                <Text style={styles.bookName}>{this.state.selectedProduct.name}</Text>
                <Text style={styles.bookWriter}>{this.state.selectedProduct.writer}</Text>
                <Text style={styles.detailsCategory}>تعداد صفحات : {this.state.selectedProduct.pages}</Text>
                <View style={styles.bookDetails}>
                    <Text style={styles.details}>{this.setCategoryAge(this.state.selectedProduct.age)}</Text>
                    <Text style={styles.details}>{this.setCategorySubject(this.state.selectedProduct.subject)},</Text>
                    <Text>دسته بندی ها : </Text>
                </View>
                <View style={styles.tabBar}>
                    <Text style={[styles.tabBar , {color : this.state.selectedTab0Color}]} onPress={() => this.navigateTab(0)}>توضیحات</Text>
                    <Text style={[styles.tabBar, {color : this.state.selectedTab1Color}]} onPress={() => this.navigateTab(1)} >گزیده ای از متن</Text>
                </View>
                <Animated.Text style={[styles.underLine , {marginRight : this.state.underLinePosition}]}></Animated.Text>
                <Animated.View style={[styles.tabsContainer , {transform : [{translateX : this.state.tabNavigating}]}]}>
                    <View style={styles.tabContent}>
                       <View>
                           <Text style={styles.content}>محتوای دومین تب  که داریم روش کار میکنیم و باید که آنهرا از دیتابیس سیستم دریافت کنیم</Text>
                       </View>
                    </View>
                    <View style={styles.tabContent}>
                       <View>
                           <Text style={styles.content}>محتوای اولین تب  که داریم روش کار میکنیم و باید که آنهرا از دیتابیس سیستم دریافت کنیم</Text>
                       </View>
                    </View>
                </Animated.View>
                </ScrollView>
                <Text style={styles.btn}>خواندن</Text>
             </View>
         )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#fff',
    },
    header : {
        backgroundColor : '#FAA5C2',
        paddingBottom : 30,
        // position : 'relative',
    },
    backGroundBackBtn : {
        backgroundColor : "#fff",
        width : 30,
        height : 30,
        marginTop : 30,
        marginLeft : 25,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
    },
    img : {
        marginLeft : 'auto',
        marginRight : 'auto',
        width : 155,
        height : 230,
        borderRadius : 10,
    },
    likeBtn : {
        width : 70,
        backgroundColor : '#fff',
        height : 70,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 50,
        position : 'absolute',
        borderColor : '#FAA5C2',
        borderStyle : 'solid',
        borderWidth : 7,
        top : 265,
        left : 10,
    },
    bookName : {
        // fontWeight : 'bold',
        fontSize : 24,
        color : 'black',
        marginTop : 20,
        marginRight : 10,
        textAlign : 'right'
    },
    bookWriter : {
        color : '#7D7D81',
        marginRight : 10,
        textAlign : 'right'
    },
    bookDetails : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginRight : 10,
        marginLeft : 90,
        marginTop : 10,
    },
    details : {
        fontSize : 16,
        color : '#E16389'
    },
    detailsCategory : {
        marginRight : 10,
        fontSize : 15,
        marginTop : 10,
    },
    tabBar : {
        flexDirection : 'row-reverse',
        // textAlign : 'right',
        justifyContent : 'flex-start',
        marginLeft : 5,
        marginRight : 10,
        marginTop : 13,
        fontSize : 16,
    },
    tabsContainer : {
        width : 2*Dimensions.get('window').width + 20,
        flexDirection : 'row',
        // transform : [{translateX : 0}],
        // alignItems : 'flex-end',
        // marginLeft : 'auto'
        marginBottom : 60,
    },
    tabContent : {
        width : Dimensions.get('window').width,
        alignItems : 'flex-end',
        
    },
    underLine : {
        borderTopWidth : 2,
        borderTopColor : 'black',
        borderStyle : 'solid',
        width : 30,
        height : 0,
        // justifyContent : 'center',
        // backgroundColor : 'red',
        // alignItems : 'flex-end',
        // textAlign : 'right',
        marginLeft : 'auto',
        
    },
    content : {
        paddingRight : 13,
        paddingLeft : 13,
        paddingTop : 10,
        paddingBottom : 20,
    },
    btn : {
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