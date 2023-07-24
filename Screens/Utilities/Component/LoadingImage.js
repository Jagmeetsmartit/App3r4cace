import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Colors} from './Colors';
export function LoadingImage({source, style, resizeMode}) {
  return <ActivityIndicator size="small" color={Colors.mainColor} />;
}
