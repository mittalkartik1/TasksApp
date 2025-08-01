import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SCREENS, STRINGS } from '../../../constants/enum/GeneralEnum';
import { Task } from '../../../constants/interfaces/Task';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../constants/interfaces/Navigator';

const TaskFlatList = React.memo(({ data }: { data: Array<Task> }) => {
  const navigation = useNavigation<NavigationProp>();

  const taskItem = useCallback(({item} : {item: Task}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(SCREENS.TASKS_DETAIL_SCREEN, {
            isNew: false,
            task: item,
          });
        }}
      >
        <View style={styles.taskItemStyle}>
          <Text style={styles.listTaskTitleStyle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyView = () => {
    return (
      <View style={styles.centralize}>
        <Text style={styles.taskTextStyle}>{STRINGS.NO_TASKS}</Text>
      </View>
    );
  };

  const seperatorView = () => <View style={styles.itemSeperatorStyle} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item: Task) => item.id?.toString() ?? '-1'}
      renderItem={taskItem}
      ListEmptyComponent={emptyView}
      contentContainerStyle={styles.listContainerStyle}
      ItemSeparatorComponent={seperatorView}
      windowSize={5}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
    />
  );
});

export default TaskFlatList;
