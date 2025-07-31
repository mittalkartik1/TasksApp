import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/enum/GeneralEnum';

export const styles = StyleSheet.create({
  containerTab: {
    elevation: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.WHITE,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  taskItemStyle: {
    backgroundColor: 'white',
    marginHorizontal: 6, //normalize function can be used later
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    padding: 10,
  },
  centralize: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  taskTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.PRIMARY,
  },
  listContainerStyle: {
    marginTop: 12,
    marginHorizontal: 6,
    paddingBottom: 100,
  },
  itemSeperatorStyle: {
    width: 12,
    height: 12,
  },
  plusViewStyle: {
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'red',
  },
  plusImageStyle: {
    height: 60,
    width: 60,
    tintColor: COLORS.PRIMARY,
  },
  listTaskTitleStyle: {
    color: COLORS.BLACK,
    fontSize: 14,
  },
  loaderTopViewStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    opacity: 0.7,
    backgroundColor: 'black',
    position: 'absolute',
  },
  loaderBottomViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  indicatorStyle: {
    backgroundColor: COLORS.PRIMARY,
    height: 3,
  },
  loadingText: { 
    color: 'white',
    marginTop: 10
  }
});
