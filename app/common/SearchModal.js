import React, {useState} from 'react';
import {Modal, StyleSheet, View, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {setListFilter} from '../services/general/generalActions';
import {debounce} from 'lodash';

const SearchModal = ({isVisible, onRequestClose}) => {
  const dispatch = useDispatch();

  // use debounce for smooth search, prevent loading api every time typing something
  const onType = debounce(async text => {
    dispatch(setListFilter({keyword: text}));
  }, 1000);

  return (
    <Modal
      transparent={true}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      visible={isVisible}
      onRequestClose={onRequestClose}
      disableAnimation>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onType}
          placeholder="Aa"
        />
        <Button onPress={onRequestClose} title={'CLOSE'} />
      </View>
    </Modal>
  );
};

SearchModal.propTypes = {
  isVisible: PropTypes.bool,
};

SearchModal.defaultProps = {
  isVisible: false,
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  container: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    marginTop: 150,
    marginVertical: 50,
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
});
export default SearchModal;
