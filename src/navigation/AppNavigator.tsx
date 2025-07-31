import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from '../constants/enum/GeneralEnum';
import TaskDetailScreen from '../screens/taskDetail/TaskDetailScreen';
import TasksListScreen from '../screens/tasksList/TasksListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = (): React.JSX.Element => {
  return (
    <>
      <Stack.Navigator initialRouteName={SCREENS.TASKS_LIST_SCREEN}>
        <Stack.Screen
          name={SCREENS.TASKS_LIST_SCREEN}
          component={TasksListScreen}
          options={{ headerTitle: 'Tasks' }}
        />
        <Stack.Screen
          name={SCREENS.TASKS_DETAIL_SCREEN}
          component={TaskDetailScreen}
          
          options={{ headerTitle: 'Detail', headerBackButtonDisplayMode: 'minimal' }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
