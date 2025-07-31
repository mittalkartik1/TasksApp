import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS } from '../enum/GeneralEnum';
import { Task } from './Task';

type RootStackParamList = {
    [SCREENS.TASKS_DETAIL_SCREEN]: { isNew: boolean, task?: Task };
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  SCREENS.TASKS_DETAIL_SCREEN
>;