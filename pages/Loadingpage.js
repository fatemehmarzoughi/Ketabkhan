import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Realm from 'realm';
import AnimatedLoader from "react-native-animated-loader";

realm = new Realm ({
  path:'Database.realm',
  schema : [
    {
      name : 'Books',
      primaryKey : 'id' ,
      properties : {
        //8 columns
        id : 'int',
        name : 'string',
        categoryAge : 'int',
        categorySubject : 'int',
        explanationOfTheBook : 'string',
        isLike : 'int',
        pages : 'int',
        writer : 'string',
        imagePath : 'string',
      }
    }
  ]
})
export class Loadingpage extends React.Component{
  constructor()
  {
    super();
    this.state = {
      loading : false,
      visible: true
    }
    realm = new Realm({
      path : 'Database.realm',
    })

  //inserting data

    // realm.write(() => {
    //   realm.create('Books' , {
    //     id : 0,
    //     name : 'عاشقان هفت دریا',
    //     categoryAge : 2,
    //     categorySubject : 0,
    //     explanationOfTheBook : 'این کتاب داستانی ست افاسنه ای از مردمی که عاشق بودند',
    //     writer : 'Jozeph',
    //     isLike : 0,
    //     pages : 80,
    //     imagePath : "require('../../images/bookCover1.jpg')",
    //   })
    // })
    // realm.write(() => {
    //   realm.create('Books' , {
    //     id : 1,
    //     name : 'داستان راستان',
    //     categoryAge : 2,
    //     categorySubject : 1,
    //     explanationOfTheBook : 'این داستانی ست افسانه ای',
    //     writer : 'دهخدا',
    //     isLike : 0,
    //     pages : 800,
    //     imagePath : "require('../../images/bookCover2.jpg')"
    //   })
    // })
    // realm.write(() => {
    //   realm.create('Books' , {
    //     id : 2,
    //     name : 'دور دنیا در 8 ساعت',
    //     categoryAge : 2,
    //     categorySubject : 2,
    //     explanationOfTheBook : 'رتبه ی اول بشوید',
    //     writer : 'خیلی سبز',
    //     isLike : 0,
    //     pages : 700,
    //     imagePath : "require('../../images/bookCover3.jpg')",
    //   })
    // })
    // realm.write(() => {
    //   realm.create('Books' , {
    //     id : 3,
    //     name : 'ماشا و میشا',
    //     categoryAge : 1,
    //     categorySubject : 1,
    //     explanationOfTheBook : 'داستان های ماشا و میشا رو از دست ندید',
    //     writer : 'دیزنی',
    //     isLike : 0,
    //     pages : 20,
    //     imagePath : "require('../../images/bookCover4.jpg')",
    //   })
    // })
    // realm.write(() => {
    //   realm.create('Books' , {
    //     id : 4,
    //     name : 'تام و جری',
    //     categoryAge : 0,
    //     categorySubject : 1,
    //     explanationOfTheBook : 'ماجراهای گربه و موش',
    //     writer : 'دیزنی',
    //     isLike : 0,
    //     pages : 10,
    //     imagePath : "require('../../images/bookCover5.jpg')",
    //   })
    // })
  }
  
  render(){
    const { visible } = this.state;
    return(
      <View style={styles.container}>
          <AnimatedLoader
           visible={visible}
           overlayColor="#FAD0C9FF"
           source={require("../images/book2.json")}
           animationStyle={styles.lottie}
           speed={1}
         >
           <Text>در حال بارگذاری...</Text>
         </AnimatedLoader>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  lottie : {
    width: 220,
    height: 220
  }

});
