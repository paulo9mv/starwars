import React, {Component} from 'react';
import {Linking} from 'react-native';

import IconButton from './IconButton';

const worldIcon = require('../../assets/world.png');

export default class Browser extends Component {
  openBrowser = () => {
    const {url} = this.props;
    Linking.openURL(url);
  };

  render() {
    return (
      <IconButton
        onPress={this.openBrowser}
        icon={worldIcon}
        width={30}
        height={30}
      />
    );
  }
}
