import React from 'react';
import {Text , View , StyleSheet} from 'react-native';
import PDFView from 'react-native-view-pdf';

export class PDFViewPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const url = this.props.navigation.dangerouslyGetState().routes[10].params.uri;
        const id = this.props.navigation.dangerouslyGetState().routes[10].params.id;
        const page = this.props.navigation.dangerouslyGetState().routes[10].params.page;
        return(
            <View style={[{flex : 1}]}>
                <Text style={styles.backstyle} onPress={() => this.props.navigation.navigate('Product' , {id , page})}>  بازگشت </Text>
                <PDFView
                  fadeInDuration={250.0}
                  style={{ flex: 1 }}
                  resource={url}
                  resourceType={'url'}
                  onLoad={() => console.log(`PDF rendered from ${'uri'}`)}
                  onError={(error) => console.log('Cannot render PDF', error)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backstyle : {
        textAlign : 'left',
        fontSize : 15,
        color : '#E16389',
        borderBottomColor : '#E16389',
        borderBottomWidth : .5,
        marginBottom : 3,
    }
})