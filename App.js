import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Loadingpage} from "./pages/Loadingpage";
import {MainPage} from "./pages/MainPage"

//import { super } from '@babel/types';

export default class App extends React.Component{
  constructor()
  {
    super();
    this.state={
      loading : true,
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({loading : false}) 
    }, 3000)
  }

  render(){

    return(
      <>
      {this.state.loading ? 
      (<Loadingpage />)
       :
      (<MainPage />)
      }
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});