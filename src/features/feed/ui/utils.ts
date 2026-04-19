import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const THRESHOLD = 200;

export const isNearBottom = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;

  return contentOffset.y + layoutMeasurement.height >= contentSize.height - THRESHOLD;
};
