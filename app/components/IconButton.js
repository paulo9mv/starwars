import * as React from 'react';
import {TouchableOpacity, Image} from 'react-native';

export default class IconButton extends React.Component {
  render() {
    const {width, height, onPress, icon} = this.props;
    const dimensions = {width, height};

    return (
      <TouchableOpacity onPress={onPress}>
        <Image source={icon} style={dimensions} />
      </TouchableOpacity>
    );
  }
}
