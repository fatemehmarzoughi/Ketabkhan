import React from 'react';
import Realm from 'realm'
import { StyleSheet, Text, View , Image,Dimensions  , SafeAreaView, TouchableOpacity , Animated} from 'react-native';
import { TextInput, FlatList, ScrollView ,TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import styles from './categoryPages/styleCategory.css';

export class LeftSideBar extends React.Component{
    constructor(props){
        super(props);
        realm = new Realm({
          path : 'Database.realm',
        })
        this.state = {
            title : '',

            leftSideBarPosition : new Animated.Value(-90),

            isReadingList : realm.objects("Books").filtered('isReading = 1'),
            showingIsReading : [],
        }
      // console.log(`this.props.page = ${this.props.page}`)

      this.state.showingIsReading = [...this.state.isReadingList];
    }

    openLeftSideBar = () => {
        Animated.timing(this.state.leftSideBarPosition , {
          toValue : 0,
          duration : 400,
        }).start()
    }
    
    closeLeftSideBar = () => {
        Animated.timing(this.state.leftSideBarPosition , {
          toValue : -90,
          duration : 400,
        }).start()
    }
    
    removeFromReadingList = (id) => {
        const db = realm.objects("Books");
        realm.write(() => {
          db[id].isReading = 0;
        })
        this.setState({
          showingIsReading : this.state.isReadingList
        })
    }

    componentDidMount(){
      if(this.props.page === 'CategoryAll') this.setState({title : 'همه دسته ها'});
      else if(this.props.page === 'CategorySubjectLovely') this.setState({title : 'عاشقانه-عارفانه'})
      else if(this.props.page === 'CategorySubjectRoman') this.setState({title : 'رمان-داستانی'})
      else if(this.props.page === 'CategorySubjectScience') this.setState({title : 'علمی'})
      else if(this.props.page === 'CategoryAgeTeenage') this.setState({title : 'نوجوان'});
      else if(this.props.page === 'CategoryAgeChildren') this.setState({title : 'کودکان'});
      else if(this.props.page === 'CategoryAgeAdult') this.setState({title : 'بزرگسال'});
      else if(this.props.page === 'Likes') this.setState({title : 'مورد علاقه های من'});
      else if(this.props.page === 'Home') this.setState({title : 'کتابخوان'})
    }

    render(){
        this.state.showingIsReading = [...this.state.isReadingList];
        return(
          <SafeAreaView>
            <View style={styles.header}>
              <Icon style={styles.bellIcon} onPress={() => this.openLeftSideBar()} name="clock" size={40} color='#333' />
              <Text style={[styles.title , {fontSize : 18}]} >{this.state.title}</Text>
              <Icon onPress={() => this.props.navigation.openDrawer()} style={[styles.menuIcon ]} name="navicon" size={35} color='#333' />
            </View>   
            <Animated.View style={[styles.leftSideBar , {translateX : this.state.leftSideBarPosition, height : Dimensions.get('window').height, zIndex : 1}]}>
              <TouchableWithoutFeedback style={[styles.closeIcon]} onPress={() => this.closeLeftSideBar()}>
                  <Icon name="close" size={30} color='#333' />
              </TouchableWithoutFeedback>
              <SafeAreaView style={{paddingBottom : 100}} >
                <FlatList 
                  data={this.state.showingIsReading}
                  keyExtractor={(item, index) => index.toString()}
                  style={{marginTop : 20}}
                  renderItem = {({item}) => (
                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Product' , {id : item.id , page : this.props.page})}>
                      <Icon onPress={() => this.removeFromReadingList(item.id)} name="close" size={20} color='#333' />                  
                      <Image style={styles.readingListItem} source={{uri : item.imagePath}} />
                    </TouchableOpacity>
                  )}
                />
              </SafeAreaView>
            </Animated.View>
          </SafeAreaView>
        )
      }
}