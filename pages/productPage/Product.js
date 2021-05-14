import React from 'react';
import { StyleSheet, Text, View , Image , Dimensions , SafeAreaView , useParams , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import Back from '../back.js'
import {realm} from '../../data/realmConnection';
import styles from './styleProduct.css';
// import {styles} from './productStyle';

export class Product extends React.Component{
    constructor(props){        
        super(props);
        this.state = {
          products :  realm.objects("Books"),
          tabNavigating : new Animated.Value(-Dimensions.get('window').width - 10),
          selectedTab0Color : 'black',
          selectedTab1Color : '#7D7D81',
          underLinePosition : new Animated.Value(10),
          likeIcon :  0,
          dislikeIcon :  1,
          btnOpacity : new Animated.Value(1),
          btnBottom : new Animated.Value(17),
          checkIconOpacity : 0,
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

    addToReadingList = (id) => {
        if(id.isReading == 0)
        {
            Animated.timing(this.state.btnBottom , {
                toValue : 70,
                duration : 500,
            }).start();
            Animated.timing(this.state.btnOpacity , {
                toValue : 0,
                delay : 200,
                duration : 400,
            }).start();
            this.setState({
                checkIconOpacity : 1,
            })
            realm.write(() => {
                id.isReading = 1;
            })
        }
        else
        {
            Animated.timing(this.state.btnBottom , {
                toValue : 17,
                duration : 0,
            }).start();
            Animated.timing(this.state.btnOpacity , {
                toValue : 1,
                duration : 0,
            }).start();
            this.setState({
                checkIconOpacity : 0,
            })
            realm.write(() => {
                id.isReading = 0;
            })
        }
    }

    setLike = (id) => {
        if(id.isLike === 1)
        {
            realm.write(() => {
                id.isLike = 0;
            })
            this.setState({
                likeIcon : 0,
                dislikeIcon : 1
            })
        }
        else
        {
            realm.write(() => {
               id.isLike = 1;
            })
            this.setState({
                likeIcon : 1,
                dislikeIcon : 0
            })
        }
    }

    componentWillReceiveProps(){
        const id = this.props.navigation.dangerouslyGetState().routes[8].params.id;
        let selectedId = this.state.products.filtered(`id = ${id}`)[0];        

        const isLike = selectedId.isLike;
        const isReading = selectedId.isReading;

        if(isLike) 
        {
            console.log('islike check status')
            this.setState({
                likeIcon : 1,
                dislikeIcon : 0
            })
        }
        else
        {
            this.setState({
                likeIcon : 0,
                dislikeIcon : 1
            })
        }

        if(isReading) 
        {
            console.log('isReading check status')
            Animated.timing(this.state.btnBottom , {
                toValue : 17,
                duration : 500,
            }).start();
            Animated.timing(this.state.btnOpacity , {
                toValue : 1,
                delay : 200,
                duration : 400,
            }).start();
            this.setState({
                checkIconOpacity : 1,
            })
        }
        else
        {
            this.setState({
                checkIconOpacity : 0,
            })
        }
    }

    render(){
        //getting selected product's id from the previouse page 
        const id = this.props.navigation.dangerouslyGetState().routes[8].params.id;

        //finding out that where this page is comming from
        const page = this.props.navigation.dangerouslyGetState().routes[8].params.page;

        console.log("10 => "+JSON.stringify(this.props.navigation.dangerouslyGetState().routes[10]))
        console.log("8 => "+JSON.stringify(this.props.navigation.dangerouslyGetState().routes[8]))

        //doing a search through the Pruducts And find the id of the selected product
        let selectedId = this.state.products.filtered(`id = ${id}`)[0];

        // saving founded features in the state of this page
        let selectedAge = selectedId.categoryAge;
        let selectedName = selectedId.name;
        let selectedWriter = selectedId.writer;
        let selectedSubject = selectedId.categorySubject;
        let selectedPages = selectedId.pages;
        let selectedImagePath =selectedId.imagePath;
        let selectedPdfUri = selectedId.pdfPath;
        let selectedExplanationOfTheBook = selectedId.explanationOfTheBook;
        let selectedAbstraction = selectedId.abstraction;

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
                     <Icon style={[{opacity : this.state.dislikeIcon , position : 'absolute'}]} onPress={() => this.setLike(selectedId)} name="heart" size={35} color='#FAA5C2' />
                     <Icon2 style={[{opacity : this.state.likeIcon , position : 'absolute'}]} onPress={() => this.setLike(selectedId)} name="heart" size={30} color='#FAA5C2' />
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
                            <Text style={styles.content}>{selectedExplanationOfTheBook}</Text>
                        </View>
                     </View>
                     <View style={styles.tabContent}>
                        <View>
                            <Text style={styles.content}>{selectedAbstraction}</Text>
                        </View>
                     </View>
                 </Animated.View>
                </ScrollView>
                <Text onPress={() => this.props.navigation.navigate("PDFViewPage" , { uri : selectedPdfUri, id : selectedId, page })} style={styles.readingBtn}>خواندن</Text>
                <Text onPress={() => this.addToReadingList(selectedId)} style={styles.addToReadingBtn}><Icon name="clock" size={24}  /></Text>
                <Text onPress={() => this.addToReadingList(selectedId)} style={[styles.addToReadingBtn , {opacity : this.state.checkIconOpacity}]}><Icon name="check" color={'green'} size={24}  /></Text>
                <Animated.Text  style={[styles.addToReadingBtnReaction , {bottom : this.state.btnBottom, opacity : this.state.btnOpacity}]}><Icon name="check" size={24} color={'green'} /></Animated.Text>
             </View>
         )
    }
}