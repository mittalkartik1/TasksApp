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
    height: 20,
    width: 20,
  },
  taskTitleStyle: {
    fontWeight: '500',
    fontSize: 18,
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
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    marginBottom: 5,
    fontWeight: '600',
    color: 'black',
    fontSize: 20,
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
    justifyContent: 'space-between',
    gap: 10,
    paddingBottom: 20,
  },
  statusStyle: {
    paddingLeft: 5,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  flex1: {
    flex: 1,
  },
  parentView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#D3D3D3',
    width: '100%',
    marginBottom: 20,
  },
  footerBtn: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  footerText: { paddingHorizontal: 20, paddingVertical: 15 },
  footerTextStyle: { color: 'white', fontSize: 16 },
});
