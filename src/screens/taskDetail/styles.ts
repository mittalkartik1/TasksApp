import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/enum/GeneralEnum';

export const styles = StyleSheet.create({
  editImageStyle: {
    height: 20,
    width: 20,
    tintColor: COLORS.PRIMARY,
    marginRight: 20,
  },
  saveImageStyle: {
    height: 25,
    width: 25,
    tintColor: COLORS.PRIMARY,
  },
  taskTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  taskEditStyle: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '400',
    marginBottom: 20,
  },
  taskBodyStyle: {
    fontSize: 16,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 40,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  descStyle: {
    marginTop: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10
  },
  statusStyle: {
    paddingLeft: 5,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
});
