import { Alert, Platform, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const showMessage = (
  msg: string,
  onDismiss?: (() => void) | undefined,
) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
    onDismiss?.call(null);
  } else {
    Alert.alert(
      msg,
      undefined,
      [
        {
          text: 'OK',
          onPress: onDismiss,
        },
      ],
    );
  }
};

export const executeIfOnline = async (callbackFunc: () => {}) => {
  const state = await NetInfo.fetch();
  const hasInternet =
    state.isConnected &&
    ((Platform.OS === 'ios' && __DEV__) || state.isInternetReachable);
  if (!hasInternet) {
    showMessage('No internet connection');
  } else {
    callbackFunc();
  }
  return hasInternet;
};
