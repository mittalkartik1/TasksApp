import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { COLORS, SCREENS, STRINGS } from '../../constants/enum/GeneralEnum';
import { NavigationProp } from '../../constants/interfaces/Navigator';
import { Task } from '../../constants/interfaces/Task';
import { tasksApi, useLazyGetTasksQuery } from '../../services/tasksApi';
import TaskFlatList from './components/TaskFlatList';
import NetInfo from '@react-native-community/netinfo';
import { styles } from './styles';
import { showMessage } from '../../utils/Utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const TasksListScreen = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<NavigationProp>();
  const routes = [
    { key: 'pendingTasks', title: STRINGS.PENDING_TASKS },
    { key: 'completedTasks', title: STRINGS.COMPLETED_TASKS },
  ];

  const cachedData = useSelector(
    (state: RootState) =>
      tasksApi.endpoints.getTasks.select(undefined)(state)?.data,
  );

  //RTK Query
  const [triggerGetTasks, { data: apiData, isFetching, isError, error }] =
    useLazyGetTasksQuery();

  const [shouldRefetch, setShouldRefetch] = useState(true);

  const [isConnected, setIsConnected] = useState<boolean | null>(false);

  const latestNetInfo = React.useRef<{
    reachable: boolean | null;
    isConnected: boolean | null;
  }>({ reachable: false, isConnected: false });

  const isFocused = useIsFocused();

  const listData = apiData || cachedData;

  if (isError) {
    showMessage(`Not able to sync ${JSON.stringify(error)}`);
  }

  useEffect(() => {
    let stableCheck: NodeJS.Timeout;
    const unsubscribe = NetInfo.addEventListener(state => {
      latestNetInfo.current = {
        reachable:
          (Platform.OS === 'ios' && __DEV__) || state.isInternetReachable,
        isConnected: state.isConnected,
      };

      clearTimeout(stableCheck);

      stableCheck = setTimeout(() => {
        const hasInternet =
          latestNetInfo.current.reachable && latestNetInfo.current.isConnected;
        setIsConnected(hasInternet);
        if (!hasInternet) {
          //will set refetch flag true if user goes offline
          setShouldRefetch(!hasInternet);
        }
      }, 500);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isFocused && shouldRefetch && isConnected) {
      refetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, shouldRefetch, isConnected]);

  const refetchData = async () => {
    try {
      await triggerGetTasks(undefined, false);
      setShouldRefetch(false);
    } catch (e) {
      showMessage('Not able to sync');
    }
  };

  const renderTabBar = (tabProps: any) => (
    <TabBar
      {...tabProps}
      style={styles.containerTab}
      activeColor={COLORS.BLACK}
      inactiveColor={COLORS.BLACK_40}
      indicatorStyle={styles.indicatorStyle}
    />
  );

  const setTabViews = () => (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'pendingTasks':
            return (
              <TaskFlatList
                key={'pending'}
                data={(listData || []).filter((item: Task) => !item.completed)}
              />
            );
          case 'completedTasks':
            return (
              <TaskFlatList
                key={'completed'}
                data={(listData || []).filter((item: Task) => item.completed)}
              />
            );
        }
      }}
      swipeEnabled={true}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );

  return (
    <View style={styles.mainContainer}>
      {setTabViews()}
      <TouchableOpacity
        onPressIn={() =>
          navigation.navigate(SCREENS.TASKS_DETAIL_SCREEN, {
            isNew: true,
          })
        }
      >
        <View style={styles.plusViewStyle}>
          <Image
            style={styles.plusImageStyle}
            source={require('../../assets/images/plus.png')}
          />
        </View>
      </TouchableOpacity>
      {isFetching && (
        <>
          <View style={styles.loaderTopViewStyle} />
          <View style={styles.loaderBottomViewStyle}>
            <ActivityIndicator size={'large'} color={COLORS.PRIMARY} />
            <Text style={styles.loadingText}>Syncing data from server</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default TasksListScreen;
