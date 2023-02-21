import React, {useState} from 'react';
import {Modal, StyleSheet, View, Button} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {setListFilter} from '../services/general/generalActions';

const SortModal = ({isVisible, onRequestClose}) => {
  const dispatch = useDispatch();

  const onAsc = () => {
    dispatch(setListFilter({sort: 'ASCENDING'}));
    onRequestClose();
  };
  const onDesc = () => {
    dispatch(setListFilter({sort: 'DESCENDING'}));
    onRequestClose();
  };

  return (
    <Modal
      transparent={true}
      style={styles.modal}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      visible={isVisible}
      onRequestClose={onRequestClose}
      disableAnimation>
      <View style={styles.container}>
        <View style={styles.btnView}>
          <Button onPress={onAsc} title={'ASCENDING'} />
        </View>
        <View style={styles.btnView}>
          <Button onPress={onDesc} title={'DESCENDING'} />
        </View>
      </View>
    </Modal>
  );
};

SortModal.propTypes = {
  isVisible: PropTypes.bool,
};

SortModal.defaultProps = {
  isVisible: false,
};
const styles = StyleSheet.create({
  btnView: {
    padding: 10,
  },
  modal: {
    margin: 0,
  },
  container: {
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 50,
    marginVertical: 250,
    alignItems: 'center',
  },
});
export default SortModal;
