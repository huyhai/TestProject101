import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  shipToText: {fontSize: 18},
  itemParent: {padding: 16, flex: 1},
  itemParentRow: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  imgStyle: {height: 85, width: 85},
  separatorLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'darkgray',
  },
  statusText: {fontWeight: 'bold'},
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
