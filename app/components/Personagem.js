import * as React from 'react';
import {View, Text, TouchableOpacity, Share, StyleSheet} from 'react-native';

import Compartilhar from './Compartilhar';
import OpenCloseButton from './OpenCloseButton'

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
    const {personagem, indice} = this.props;
    const {name, mass, eye_color, birth_year, hair_color} = personagem;

    const {open} = this.state;

    //console.log(personagem);

    return (

        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent : 'space-between', marginBottom: 4 }}>    
            <Text style={styles.title}>#{indice} {name}</Text>            
            <OpenCloseButton style={styles.openClose} open={open} onPress={this.handleClick}/>
          </View>
          <Text style={styles.subText}>{birth_year}</Text>
          {open && (
            <View>
              <Text>Peso: {mass}kg</Text>
          <Text>Cor dos olhos: {eye_color}</Text>
          <Text>Ano de nascimento: {birth_year}</Text>
              <Text>Cor do cabelo: {hair_color}</Text>
            </View>
          )}
          </View>

    );
  }
}

const CircularStd = {
  regular: 'CircularStd-Book',
  medium: 'CircularStd-Medium',
  bold: 'CircularStd-Bold',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 30,
    marginVertical: 15,    
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: CircularStd.bold,
  },
  subText : {
    fontFamily : CircularStd.regular,
    fontSize : 16,
    color : '#B9B9B9'
  }
});
