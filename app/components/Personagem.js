import * as React from 'react';
import {View, Text, Linking, Button, StyleSheet} from 'react-native';

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

    const nameURL = `https://pt.wikipedia.org/wiki/${name}`;
    const URL = nameURL.replace(" ", "_");

    const shareMessage = `Você gosta de Star Wars? Sabia que o(a) ${name} nasceu em ${birth_year}, possui olhos da cor ${eye_color} e pesa ${mass} kg? Confira mais em ${URL} !`;

    return (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent : 'space-between', marginBottom: 4 }}>    
            <Text style={styles.title}>#{indice} {name}</Text>            
            <OpenCloseButton style={styles.openClose} open={open} onPress={this.handleClick}/>
          </View>
          <Text style={styles.subText}>{birth_year}</Text>
          {open && (
            <View>
              <View style={{flex : 1}}>
                <Text style={styles.subText}>Peso: {mass}kg</Text>
                <Text style={styles.subText}>Cor dos olhos: {eye_color}</Text>                
                <Text style={styles.subText}>Cor do cabelo: {hair_color}</Text>
              </View>
              <Compartilhar message={shareMessage}/>
              <Button title={'BABAS'} onPress={() => Linking.openURL(URL)}/>
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
  },
  details : {
    fontFamily : CircularStd.regular,
    fontSize : 12,
    color : '#B9B9B9'
  }
});
