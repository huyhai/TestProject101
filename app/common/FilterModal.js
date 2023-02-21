import React, {useState} from 'react';
import {Modal, StyleSheet, View, Button} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {setListFilter} from '../services/general/generalActions';

const FilterModal = ({isVisible, onRequestClose}) => {
  const dispatch = useDispatch();

  const onAsc = () => {
    dispatch(setListFilter({filter: 'CREATED_DATE'}));
    onRequestClose();
  };
  const onDesc = () => {
    dispatch(setListFilter({filter: 'INVOICE_DATE'}));
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
          <Button onPress={onAsc} title={'FILTER BY CREATED_DATE'} />
        </View>
        <View style={styles.btnView}>
          <Button onPress={onDesc} title={'FILTER BY INVOICE_DATE'} />
        </View>
      </View>
    </Modal>
  );
};

FilterModal.propTypes = {
  isVisible: PropTypes.bool,
};

FilterModal.defaultProps = {
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
export default FilterModal;
