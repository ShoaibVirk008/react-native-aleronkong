import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles, appImages, appIcons } from '../../services';
import { IconWithText } from '../icons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { RowBasic } from '../wrappers';
import { TinyTitle } from '../texts';
import { Spacer } from '../spacers';
import { Icons } from '..';

export const Primary = ({ size,invertColors }) => {
  return (
    <Icons.Custom
      icon={!invertColors?appImages.logo:appImages.logo_invert}
      size={size||totalSize(10)}
      //color={colors.appBgColor1}
    />
  );
}