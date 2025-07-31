import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS, STRINGS } from '../../constants/enum/GeneralEnum';
import { Task } from '../../constants/interfaces/Task';
import { AppDispatch } from '../../redux/store';
import { tasksApi } from '../../services/tasksApi';
import { executeIfOnline, showMessage } from '../../utils/Utils';
import { styles } from './styles';

const TaskDetailScreen = (props: any) => {
  const isNewTask = props.route.params.isNew;
  const [isEditable, setIsEditable] = useState(!!isNewTask);
  const [deleteTask] = tasksApi.useDeleteTaskMutation();
  const [addTask] = tasksApi.useAddTaskMutation();
  const [updateTask] = tasksApi.useUpdateTaskMutation();
  const [task, setTask] = useState<Task>({
    title: '',
    body: '',
    completed: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: setHeaderRight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, isEditable]);

  useEffect(() => {
    if (!isNewTask) {
      setTask({ body: '', ...props.route.params.task });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddTask = async () => {
    const id = Math.floor(Date.now() / 1000);
    const tempTask = { id, ...task };
    try {
      //fake api call to add task
      await addTask(tempTask).unwrap();

      //adding locally
      dispatch(
        tasksApi.util.updateQueryData('getTasks', undefined, draftTasks => {
          draftTasks?.unshift(tempTask);
        }),
      );
      showMessage('Added Successfully', () => navigation.goBack());
    } catch (error) {
      showMessage(`Add failed: ${JSON.stringify(error)}`);
    }
  };

  const onUpdateTask = async () => {
    try {
      //fake api call to update
      await updateTask(task).unwrap();

      //updating locally
      dispatch(
        tasksApi.util.updateQueryData('getTasks', undefined, draftTasks => {
          const index =
            draftTasks?.findIndex(
              (taskItem: Task) => taskItem.id === task.id,
            ) ?? -1;
          if (index !== -1 && draftTasks) draftTasks[index] = task;
        }),
      );
      showMessage('Updated Successfully', () => navigation.goBack());
    } catch (error) {
      showMessage(`Update failed: ${JSON.stringify(error)}`);
    }
  };

  const onDeleteClick = async () => {
    //alert can be added later to get consent
    try {
      //fake api call to delete
      await deleteTask(task.id).unwrap();

      //deleting locally
      dispatch(
        tasksApi.util.updateQueryData('getTasks', undefined, draftTasks => {
          const index =
            draftTasks?.findIndex(
              (taskItem: Task) => taskItem.id === task.id,
            ) ?? -1;
          if (index !== -1) draftTasks?.splice(index, 1);
        }),
      );
      showMessage('Deleted Successfully', () => navigation.goBack());
    } catch (error) {
      showMessage(`Delete failed: ${JSON.stringify(error)}`);
    }
  };

  function onSaveClick() {
    if (task.title.length === 0) {
      showMessage('Enter task title first!!');
    } else if (task.body.length === 0) {
      showMessage('Enter task description first!!');
    } else {
      if (isNewTask) {
        executeIfOnline(onAddTask);
      } else {
        executeIfOnline(onUpdateTask);
      }
    }
  }

  const setHeaderRight = () => (
    <View style={styles.rowCenter}>
      {!isNewTask && (
        <>
          {!isEditable && (
            <TouchableOpacity onPress={() => setIsEditable(true)}>
              <Image
                style={styles.editImageStyle}
                source={require('../../assets/images/pencil.png')}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => executeIfOnline(onDeleteClick)}>
            <Image
              style={styles.saveImageStyle}
              source={require('../../assets/images/delete.png')}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={styles.parentView}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.flex1}>
        <Text style={styles.titleStyle}>{STRINGS.TASK_TITLE}</Text>
        <TextInput
          placeholder={STRINGS.TASK_TITLE}
          editable={isEditable}
          placeholderTextColor={'gray'}
          value={task.title}
          multiline
          onChangeText={(text: string) =>
            setTask(prevState => ({ ...prevState, title: text }))
          }
          style={[
            styles.taskTitleStyle,
            isEditable ? styles.taskEditStyle : {},
          ]}
        />
        <View
          style={styles.separatorStyle}
        />
        <Text style={styles.titleStyle}>{STRINGS.TASK_DESC}</Text>
        <TextInput
          placeholder={STRINGS.ENTER_DESC}
          multiline
          editable={isEditable}
          placeholderTextColor={'gray'}
          value={task.body}
          onChangeText={(text: string) =>
            setTask(prevState => ({ ...prevState, body: text }))
          }
          style={[styles.taskBodyStyle, isEditable ? styles.taskEditStyle : {}]}
        />
        <View
          style={styles.separatorStyle}
        />
        <View style={styles.statusView}>
          <Text style={styles.titleStyle}>{'Is Completed'}</Text>
          <Switch
            value={task.completed}
            onValueChange={newValue =>
              setTask(prevState => ({ ...prevState, completed: newValue }))
            }
            thumbColor={isEditable ? COLORS.PRIMARY : 'gray'}
            disabled={!isEditable}
            trackColor={{ false: '#C4C4C4', true: '#A9D2FC' }} // light blue & gray
          />
        </View>
        <View
          style={styles.separatorStyle}
        />
      </ScrollView>
      {(isEditable || isNewTask) && (
        <TouchableOpacity
          onPress={onSaveClick}
          style={styles.footerBtn}
        >
          <View style={styles.footerText}>
            <Text style={styles.footerTextStyle}>
              {isNewTask ? 'Save' : 'Update'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

export default TaskDetailScreen;
