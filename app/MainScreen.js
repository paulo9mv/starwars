import * as React from 'react'

import {Text, View, ScrollView, ActivityIndicator} from 'react-native'
import Personagem from './components/Personagem'

export default class MainScreen extends React.Component{

    state = {
        data : [],
    }

    componentDidMount(){
        fetch('https://swapi.co/api/people')
        .then(response => response.json())
        .then(response => this.setState({
            data : response
        }))
        .catch(error => console.log(error));
    }

    getItems(){
        const { data } = this.state;

        console.log(data);

        if(data.length == 0){
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Buscando dados...</Text>
                </View>
            )
        }

        const { results } = data;

        return results.map(item => <Personagem key={item.name} personagem={item}/>);
    }

    render(){

        return (
        <ScrollView>
            {this.getItems()}
        </ScrollView>
        );
    }
}