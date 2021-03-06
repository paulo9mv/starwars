import React, {Component} from 'react';
import {Share, TouchableOpacity, Image} from 'react-native';

import IconButton from './IconButton';

const shareIcon = require('../../assets/share.png');

export default class Compartilhar extends Component {
  onShare = async () => {
    const {message, title} = this.props;

    try {
      const result = await Share.share({
        message,
        title,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <IconButton
        onPress={this.onShare}
        icon={shareIcon}
        width={30}
        height={30}
      />
    );
  }
}
