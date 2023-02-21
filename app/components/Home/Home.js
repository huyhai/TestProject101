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
  fetchInvoiceList,
  setListFilter,
} from '../../services/general/generalActions';
import commonStyles from '../../common/style';
import styles from './style';
import InputModal from '../../common/InputModal';
import SortModal from '../../common/SortModal';
import FilterModal from '../../common/FilterModal';
import SearchModal from '../../common/SearchModal';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModalSort: false,
      showModalFilter: false,
      showModalSearch: false,
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
    fetchAccessToken();
  }

  render() {
    const {
      listInvoices,
      invoicesParams: {canLoadMore},
      errorMessage,
    } = this.props;
    const {showModal, showModalSort, showModalFilter, showModalSearch} =
      this.state;
    return (
      <SafeAreaView style={commonStyles.flex1}>
        <View style={commonStyles.buttonView}>
          <Button title="Search" onPress={this.showSearchModal} />
          <Button title="Sort" onPress={this.showSortModal} />
          <Button title="Filter" onPress={this.showFilterModal} />
          <Button title="RESET" onPress={this.resetParams} />
        </View>
        {errorMessage !== '' ? (
          <Text style={commonStyles.errorText}>{errorMessage}</Text>
        ) : (
          ''
        )}

        <FlatList
          style={commonStyles.flex1}
          data={listInvoices}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          removeClippedSubviews={true}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            canLoadMore ? (
              <ActivityIndicator size="large" color={'red'} />
            ) : null
          }
        />
        <InputModal isVisible={showModal} pressAdd={this.pressAdd} />
        <SortModal
          isVisible={showModalSort}
          onRequestClose={this.hideSortModal}
        />
        <FilterModal
          isVisible={showModalFilter}
          onRequestClose={this.hideFilterModal}
        />
        <SearchModal
          isVisible={showModalSearch}
          onRequestClose={this.hideSearchModal}
        />
        <Button title="Create Invoice" onPress={this.clickUpdate} />
      </SafeAreaView>
    );
  }
  resetParams = () => {
    const {setListFilter} = this.props;
    setListFilter({sort: 'DESCENDING', filter: 'CREATED_DATE', keyword: ''});
  };
  onEndReached = () => {
    const {
      fetchInvoiceList,
      invoicesParams: {canLoadMore},
    } = this.props;
    if (canLoadMore) {
      fetchInvoiceList();
    }
  };

  showSearchModal = () => this.setState({showModalSearch: true});
  hideSearchModal = () => this.setState({showModalSearch: false});

  showSortModal = () => this.setState({showModalSort: true});
  hideSortModal = () => this.setState({showModalSort: false});

  showFilterModal = () => this.setState({showModalFilter: true});
  hideFilterModal = () => this.setState({showModalFilter: false});

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

  renderSeparator = () => <View style={styles.separatorLine} />;
  keyExtractor = item => item.invoiceId;
}

export const mapStateToProps = state => {
  const {general} = state;
  return {
    listInvoices: general.listInvoices,
    fetchingData: general.fetchingData,
    inputData: general.inputData,
    invoicesParams: general.invoicesParams,
    errorMessage: general.errorMessage,
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAccessToken,
      createInvoices,
      setInputData,
      fetchInvoiceList,
      setListFilter,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
