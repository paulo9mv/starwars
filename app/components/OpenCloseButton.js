import * as React from 'react';
import { TouchableOpacity, View, Image } from 'react-native'

const openArrow = require('../../assets/images/openArrow.png')
const closeArrow = require('../../assets/images/closeArrow.png')

export default class OpenClose extends React.Component{

    render(){

        const { open, onPress } = this.props;
        const icon = open ? closeArrow : openArrow;

        return (
            <TouchableOpacity onPress={onPress}>
                <Image source={icon}/>
            </TouchableOpacity>
        )
    }

}