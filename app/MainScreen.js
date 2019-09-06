import * as React from 'react';

import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Personagem from './components/Personagem';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    //this.fetchNext = this.fetchNext.bind(this);
  }

  state = {
    next: '',
    results: [],
    fetching: false,
  };

  componentDidMount() {
    fetch('https://swapi.co/api/people')
      .then(response => response.json())
      .then(response =>
        this.setState({
          next: response.next,
          results: response.results,
          count: response.count,
        }),
      )
      .catch(error => console.warn(error));
  }

  getItems() {
    const {results} = this.state;

    console.log('this.state', this.state);

    if (results.length == 0) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Buscando dados...</Text>
        </View>
      );
    }

    return results.map((item, index) => (
      <Personagem key={item.name} indice={index} personagem={item} />
    ));
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  fetchNext = ({nativeEvent}) => { 
    const {fetching, next, results} = this.state;

    if (!fetching && this.isCloseToBottom(nativeEvent) && next != null) {
      this.setState({
        fetching: true,
      });
      fetch(next)
        .then(response => response.json())
        .then(response => {
          console.log('response', response);
          console.log(results, response.results);
          const newData = [...results, ...response.results];
          console.log('newData', newData);
          const newNext = response.next;
          this.setState({results: newData, next: newNext, fetching: false});
        })
        .catch(error => console.warn('Deu ruim'));
    }
  };

  render() {
    const {fetching, next, results, count} = this.state;

    return (
      <View>
        <Text>Personagens no total: {count}</Text>
        <ScrollView onScroll={this.fetchNext}>
          {fetching && (
            <ActivityIndicator
              style={{position: 'absolute', bottom: 10}}
              size="large"
              color="#0000ff"
            />
          )}
          {this.getItems()}
        </ScrollView>
      </View>
    );
  }
}
