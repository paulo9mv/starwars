import * as React from 'react';
import { TouchableOpacity, View, Image } from 'react-native'

import IconButton from './IconButton'

const openArrow = require('../../assets/images/openArrow.png')
const closeArrow = require('../../assets/images/closeArrow.png')

export default class OpenClose extends React.Component{

    render(){

        const { open, onPress } = this.props;
        const icon = open ? closeArrow : openArrow;

        return (
            <IconButton onPress={onPress} icon={icon} width={20} height={20}/>            
        )
    }

}