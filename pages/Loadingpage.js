import React from 'react';
import { StyleSheet, Text, View , Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AnimatedLoader from "react-native-animated-loader";
import {realm} from '../data/realmConnection';

export class Loadingpage extends React.Component{
  constructor()
  {
    super();
    this.state = {
      loading : false,
      visible: true
    }

  //inserting data

  
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
