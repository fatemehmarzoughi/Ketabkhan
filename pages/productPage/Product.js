import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView , useParams , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import Back from '../back.js'
import Realm from 'realm';
import styles from './styleProduct.css';



export class Product extends React.Component{
    constructor(props){
        realm = new Realm({
            path : 'Database.realm',
        });
        
        super(props);
        this.state = {
          products :  realm.objects("Books"),
          tabNavigating : new Animated.Value(-Dimensions.get('window').width - 10),
          selectedTab0Color : 'black',
          selectedTab1Color : '#7D7D81',
          underLinePosition : new Animated.Value(10),
          likeIcon :  0,
          dislikeIcon :  1,
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
            return "عاشقانه-عارفانه";
            break;
            case 1 : 
            return "داستانی-رمان";
            break;
            case 2 : 
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
    }

    render(){
        
        realm = new Realm({
            path : 'Database.realm',
        });
        //getting selected product's id from the previouse page 
        // console.log(this.props.navigation.dangerouslyGetState().routes);
        const id = this.props.navigation.dangerouslyGetState().routes[8].params.id;

        //finding out that where this page is comming from
        const page = this.props.navigation.dangerouslyGetState().routes[8].params.page;

        //finding the pruduct's features
        let length = this.state.products.length;

        //doing a search through the Pruducts And find the id of the selected product
        let selectedId;
        for(let i=0 ; i<length ; i++)
        {
            if(this.state.products[i].id === id)
            {
                selectedId = i;
                break;
            }
            else continue;
        }

        let selectedIsLike = this.state.products[selectedId].isLike;

        // saving founded features in the state of this page
        let selectedAge = this.state.products[selectedId].categoryAge;
        let selectedName = this.state.products[selectedId].name;
        let selectedWriter = this.state.products[selectedId].writer;
        let selectedSubject = this.state.products[selectedId].categorySubject;
        let selectedPages = this.state.products[selectedId].pages;
        let selectedImagePath =this.state.products[selectedId].imagePath;
        let selectedPdfUri = this.state.products[selectedId].pdfPath;
        
        const setLike = () => {
            let selectedIsLike = this.state.products[selectedId].isLike;
            let likeObjectUpdate = realm.objects("Books");
            if(selectedIsLike === 1)
            {
                realm.write(() => {
                    likeObjectUpdate[selectedId].isLike = 0;
                })
                this.setState({
                    likeIcon : 0,
                    dislikeIcon : 1
                })
                alert("disLiked")
            }
            else
            {
                realm.write(() => {
                   likeObjectUpdate[selectedId].isLike = 1;
                })
                this.setState({
                    likeIcon : 1,
                    dislikeIcon : 0
                })
                alert("Liked")
            }
        }

         return(
             <View style={styles.container}>
                <ScrollView>
                 <View style={styles.header}>
                    <View style={styles.backGroundBackBtn}>
                       <Back  style={styles.backGroundBackBtn} customClick={() => this.props.navigation.navigate(page)} />
                    </View>
                    <Image style={styles.img} source={{uri : selectedImagePath}} />
                 </View>
                 <View style={styles.likeBtn}>
                     <Icon style={[{opacity : this.state.dislikeIcon , position : 'absolute'}]} onPress={() => setLike()} name="heart" size={35} color='#FAA5C2' />
                     <Icon2 style={[{opacity : this.state.likeIcon , position : 'absolute'}]} onPress={() => setLike()} name="heart" size={30} color='#FAA5C2' />
                 </View>
                 <Text style={styles.bookName}>{selectedName}</Text>
                 <Text style={styles.bookWriter}>{selectedWriter}</Text>
                 <Text style={styles.detailsCategory}>تعداد صفحات : {selectedPages}</Text>
                 <View style={styles.bookDetails}>
                     <Text style={styles.details}>{this.setCategoryAge(selectedAge)}</Text>
                     <Text style={styles.details}>{this.setCategorySubject(selectedSubject)},</Text>
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
                <Text onPress={() => this.props.navigation.navigate("PDFViewPage" , { uri : selectedPdfUri, id : selectedId, page })} style={styles.btn}>خواندن</Text>
             </View>
         )
    }
}