import React from 'react';
import {Text, View , Image , SafeAreaView ,FlatList} from 'react-native';
import styles from './styleLikes.css'
import {LeftSideBar} from '../leftSideBar';
import {realm} from '../../data/realmConnection';


export class Likes extends React.Component{
    
    constructor(){
        super();
        this.state = {
            products : realm.objects("Books").filtered('isLike = 1'),
            showingProducts : [],
        }
        this.state.showingProducts = [...this.state.products]
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

    dislike = (selectedId) => {
        let likeObjectUpdate = realm.objects("Books");
        realm.write(() => {
            likeObjectUpdate[selectedId].isLike = 0;
        })
        this.setState({
            showingProducts : this.state.products
        })
    }

    render(){
        this.state.showingProducts = [...this.state.products]
        return(
            <SafeAreaView style={styles.container}>
              <LeftSideBar style={{zIndex : 122}} navigation={this.props.navigation} page='Likes'/>
              <FlatList 
               data={this.state.showingProducts}
               style={styles.productsStyle}
               keyExtractor={(item, index) => index.toString()}
               renderItem = {({item}) => (
                  <View style={[styles.productBox]}>
                        <View style={[styles.content]}>
                            <View style={[styles.rightContent]}>
                                <Text style={[styles.explenationB]}>{item.name}</Text>
                                <Text style={styles.explenation}>رده سنی : {this.setCategoryAge(item.categoryAge)}</Text>
                                <Text style={styles.explenation}>دسته بندی موضوع : {this.setCategorySubject(item.categorySubject)}</Text>
                                <Text style={styles.explenation}>تعداد صفحات : {item.pages}</Text>
                                <Text style={styles.explenation}>نویسنده : {item.writer}</Text>
                                {/* <Text style={styles.explenationB}>قیمت : {item.price} تومان</Text> */}
                            </View>
                            <View style={[styles.leftContent]}>
                              <Image style={[styles.img]} source={{uri : item.imagePath}} />
                            </View>
                        </View>
                        <Text onPress={() => this.props.navigation.navigate('Product' , {id : item.id , page : "Likes"})} style={[styles.btn, styles.buyBtn]}>رفتن به صفحه</Text>
                        <Text onPress={() => this.dislike(item.id)} style={styles.btn}>حذف</Text>
                  </View>
              )}
              />
            </SafeAreaView>
        )
    }
}