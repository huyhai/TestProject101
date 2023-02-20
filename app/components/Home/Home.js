import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  fetchAccessToken,
  createInvoices,
  setInputData,
} from '../../services/general/generalActions';
import commonStyles from '../../common/style';
import styles from './style';
import InputModal from '../../common/InputModal';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  static propTypes = {
    fetchAccessToken: PropTypes.func.isRequired,
    fetchingData: PropTypes.bool,
  };

  static defaultProps = {
    fetchingData: false,
  };

  componentDidMount() {
    const {fetchAccessToken} = this.props;
    // fetchAccessToken();
  }

  render() {
    const {listInvoices, fetchingData, inputData} = this.props;
    const {showModal} = this.state;
    console.log('inputData', inputData);
    return (
      <SafeAreaView style={commonStyles.flex1}>
        <View style={commonStyles.buttonView}>
          <Button title="Search" onPress={this.clickUpdate} />
          <Button title="Sort" onPress={this.clickUpdate} />
          <Button title="Filter" onPress={this.clickUpdate} />
        </View>

        <FlatList
          style={commonStyles.flex1}
          data={listInvoices}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          removeClippedSubviews={true}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <InputModal isVisible={showModal} pressAdd={this.pressAdd} />
        <Button title="Create Invoice" onPress={this.clickUpdate} />
        {fetchingData && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    );
  }

  keyExtractor = item => item.invoiceId;
  pressAdd = () => {
    const {createInvoices} = this.props;
    createInvoices();
    this.setState({showModal: false});
  };
  clickUpdate = () => {
    this.setState({showModal: true});
  };

  renderItem = ({item, index}) => {
    const {invoiceDate, description, totalAmount, invoiceId} = item;
    return (
      <View style={styles.itemParent}>
        <View style={styles.itemParentRow}>
          <Text>{`ID: ${invoiceId}`}</Text>
          <Text>{`Date: ${invoiceDate}`}</Text>
          <Text>{`Description: ${description}`}</Text>
          <Text>{`Amount: ${totalAmount}`}</Text>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={styles.separatorLine} />;
  };
}

export const mapStateToProps = state => {
  const {general} = state;
  return {
    listInvoices: general.listInvoices,
    fetchingData: general.fetchingData,
    inputData: general.inputData,
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAccessToken,
      createInvoices,
      setInputData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
