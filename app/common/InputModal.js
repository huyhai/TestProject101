import React, {useState} from 'react';
import {Modal, TextInput, StyleSheet, View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {setInputData} from '../services/general/generalActions';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const InputModal = ({isVisible, onRequestClose, pressAdd}) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onAmount = amount => {
    // only number otherwise api will return error
    dispatch(setInputData({amount: amount?.replace(/[^0-9]/g, '')}));
  };
  const onReference = reference => {
    dispatch(setInputData({reference}));
  };
  const onDate = date => {
    dispatch(setInputData({date}));
  };
  const onDescription = description => {
    dispatch(setInputData({description}));
  };
  const openDatePicker = () => {
    setOpen(true);
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
        <TextInput
          style={styles.input}
          onChangeText={onReference}
          placeholder="Invoice reference"
        />
        <Button
          style={styles.input}
          onPress={openDatePicker}
          title={'Select Date'}
        />
        <Text>{moment(date).format('YYYY-MM-DD')}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onDescription}
          placeholder="Description"
        />
        <TextInput
          style={styles.input}
          onChangeText={onAmount}
          placeholder="Amount"
          keyboardType="numeric"
        />
        <Button title="ADD INVOICES" onPress={pressAdd} />
        <DatePicker
          modal
          mode={'date'}
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            // right format for api YYYY-MM-DD
            onDate(moment(date).format('YYYY-MM-DD'));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </Modal>
  );
};

InputModal.propTypes = {
  isVisible: PropTypes.bool,
  hideModal: PropTypes.func,
};

InputModal.defaultProps = {
  isVisible: false,
  hideModal: null,
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modal: {
    margin: 0,
  },
  container: {
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 100,
    alignItems: 'center',
  },
});
export default InputModal;
