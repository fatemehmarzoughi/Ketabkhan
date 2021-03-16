import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Realm from 'realm';

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
      // rotate : new Animated.Value(0),
      // rotate : 0,
    }
    realm = new Realm({
      path : 'Database.realm',
    })

    //inserting data

    // realm.write(() => {
    //   realm.create('Books' , {
    //     id : 1,
    //     name : 'عاشقان هفت دریا',
    //     categoryAge : 2,
    //     categorySubject : 0,
    //     explanationOfTheBook : 'این کتاب داستانی ست افاسنه ای از مردمی که عاشق بودند',
    //     writer : 'Jozeph',
    //     isLike : 0,
    //     pages : 80,
    //   })
    // })
  }


  // set = () => {
  //   // setInterval(() =>  
  //   Animated.timing(this.state.rotate , {
  //     toValue : 190,
  //     duration : 100
  //   }).start()
  //   // , 100)
  // }
  
  render(){
    // this.set();
    return(
      <View style={styles.container}>
        {/* <Animated.View  style={[{transform : [{rotateX : this.state.rotate.toString() + 'deg'}]}]} > */}
          <Icon name="bell" size={35} color='#333' />
        {/* </Animated.View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E16389',
  },
  // loadingIcon : {
    // rotation: 90,
    // transform : [{rotate : '90deg'}
  // }
});
