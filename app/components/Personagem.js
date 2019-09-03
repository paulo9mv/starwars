import * as React from 'react';
import {View, Text, TouchableOpacity, Share, StyleSheet} from 'react-native';

import Compartilhar from './Compartilhar'

export default class Personagem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    open: false,
  };

  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { personagem } = this.props;
    const { name, mass, eye_color, birth_year, hair_color } = personagem;

    const { open } = this.state;

    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View style={styles.container}>
          <Text style={styles.title}>{name}</Text>
          <Text>Peso: {mass}kg</Text>
          <Text>Cor dos olhos: {eye_color}</Text>
          <Text>Ano de nascimento: {birth_year}</Text>
          <View style={styles.shareButton}>
                <Compartilhar title={'Compartilhar'} message={`Nome: ${name}`}/>
            </View>
    {open && (
        <View>
            
            <Text>Cor do cabelo: {hair_color}</Text>
        </View>
    )}  
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#BDBDBD',
        margin : 10,
        padding : 10
    },
    title : {
        fontSize : 16,
        fontWeight : 'bold',
        fontStyle : 'italic'
    },
    shareButton : {
        position : 'absolute',
        top : 4,
        right : 4,
    }
})