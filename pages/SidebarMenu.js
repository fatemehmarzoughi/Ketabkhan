import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, Text, View , Image , Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { TextInput, FlatList, ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function SidebarMenu(props){
  const [status1, isCollapsed1] = useState(true);
  const [status2, isCollapsed2] = useState(true);
  const [status3, isCollapsed3] = useState(true);
  // const items = {...props};
  // const filterItems= items.filter((items) ,{ name : 'Home'});
  // const newState = { ...state}
  // newState.routes = newState.routes.filter(item => item.routeName == 'Home')
  const getActiveRouteState = function (routes, index, name) {
    return routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
  };
  return (
    <ScrollView style={styles.drawerContent}>
      <Icon onPress={() => props.navigation.closeDrawer()} style={styles.backIcon} name="chevron-right" size={45} color='#333' />
      <View style={styles.aboveContent}>
        <Icon style={styles.appIcon} name="trophy" size={35} color='#333' />
        <Text style={styles.title}>کتابخوان</Text>
        <Text style={styles.subtitle}>کتابی دیگر، دنیایی دیگر</Text>
      </View>
      <Text
        style={styles.mainItems}
        focused={getActiveRouteState(
          props.state.routes,
          props.state.index,
          'Home'
        )}
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      >خانه</Text>
      <Text style={styles.mainItems} onPress={() => isCollapsed1(!status1)} >
      دسته بندی ها
      <Icon style={styles.backIcon} name="chevron-down" size={20} color='#333' />
      </Text>
      <Collapsible collapsed={status1}>
        <Text
            style={styles.subItems}
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'CategoryAll'
            )}
            onPress={() => {
              props.navigation.navigate('CategoryAll');
            }}
        >همه</Text>
        <Text style={styles.subItems} onPress={() => isCollapsed2(!status2)} >
        سن
        <Icon style={styles.backIcon} name="chevron-down" size={20} color='#333' />
        </Text>
        <Collapsible collapsed={status2}>
          <Text
              style={styles.subItems2}
              focused={getActiveRouteState(
                props.state.routes,
                props.state.index,
                'Child'
              )}
              onPress={() => {
                props.navigation.navigate('Child');
              }}
          >کودک</Text>
          <Text
              style={styles.subItems2}
              focused={getActiveRouteState(
                props.state.routes,
                props.state.index,
                'Teenage'
              )}
              onPress={() => {
                props.navigation.navigate('Teenage');
              }}
          >نوجوان</Text>
          <Text
              style={styles.subItems2}
              focused={getActiveRouteState(
                props.state.routes,
                props.state.index,
                'Adult'
              )}
              onPress={() => {
                props.navigation.navigate('Adult');
              }}
          >بزرگسال</Text>
        </Collapsible>
        <Text style={styles.subItems} onPress={() => isCollapsed3(!status3)} >
        موضوع
        <Icon style={styles.backIcon} name="chevron-down" size={20} color='#333' />
        </Text>
        <Collapsible collapsed={status3}>
          <Text
              style={styles.subItems2}
              focused={getActiveRouteState(
                props.state.routes,
                props.state.index,
                'Lovely'
              )}
              onPress={() => {
                props.navigation.navigate('Lovely');
              }}
          >عاشقانه</Text>
          <Text
            style={styles.subItems2}
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Arefene'
            )}
            onPress={() => {
              props.navigation.navigate('Arefane');
            }}
           >عارفانه</Text>
          <Text
            style={styles.subItems2}
            label="Roman"
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Roman'
            )}
            onPress={() => {
              props.navigation.navigate('Roman');
            }}
           >رمان</Text>
          <Text
            style={styles.subItems2}
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Story'
            )}
            onPress={() => {
              props.navigation.navigate('Story');
            }}
          >داستانی</Text>
          <Text
            style={styles.subItems2}
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Sience'
            )}
            onPress={() => {
              props.navigation.navigate('Sience');
            }}
          >علمی</Text>
        </Collapsible>
      </Collapsible>
      <Text
          style={styles.mainItems}
          focused={getActiveRouteState(
            props.state.routes,
            props.state.index,
            'Likes'
          )}
          onPress={() => {
            props.navigation.navigate('Likes');
          }}
      >مورد علاقه های من</Text>
      {/* <Text
          style={styles.mainItems}
          focused={getActiveRouteState(
            props.state.routes,
            props.state.index,
            'Card'
          )}
          onPress={() => {
            props.navigation.navigate('Card');
          }}
      >سبد کالای من</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent : {
    backgroundColor : '#E16389',
  },
  mainItems : {
    color : '#fff',
    fontSize : 15,
    padding : 20,
    fontWeight : 'bold',
  },
  subItems : {
    color : '#fff',
    fontSize : 14,
    padding : 5,
    marginRight : 30,
  },
  subItems2 : {
    color : '#fff',
    fontSize : 13,
    padding : 5,
    marginRight : 50,
  },
  backIcon : {
    // textAlign : 'right',
    // margin : 5,
    color : '#fff',
    marginTop : 20,
  },
  aboveContent : {
    alignItems : 'center',
    justifyContent : 'center',
    margin : 20,
  },
  title : {
    color : '#fff',
    fontSize : 20,

  },
  subtitle : {
    color : '#fff',
    fontSize : 12,
  },
  appIcon : {
    color : '#fff',
    margin : 15,
  }
});

export default SidebarMenu;