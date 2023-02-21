import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Home, mapDispatchToProps, mapStateToProps} from './Home';

const shallowRenderer = new ShallowRenderer();

const defaultProps = {
  fetchAccessToken: jest.fn(),
};

it('renders correctly', () => {
  const tree = shallowRenderer.render(<Home {...defaultProps} />);
  expect(tree).toMatchSnapshot();
});

test('renders correctly componentDidMount', () => {
  const tree = renderer.create(<Home {...defaultProps} />);
  tree.getInstance().componentDidMount();
  expect(defaultProps.fetchFakeData).toBeCalled();
});

describe('handle Flatlist function', () => {
  const tree = renderer.create(<Home {...defaultProps} />);
  test('calls keyExtractor', () => {
    const key = tree.getInstance().keyExtractor({id: 1});
    expect(key).toBe(1);
  });

  test('check renderItem', () => {
    const props = {
      ...defaultProps,
    };
    const SAMPLE_ITEM = {
      id: '123abc',
      providerDisplayName: 'abc',
      state: 'Ok',
      qr: {url: ''},
      amount: 123,
      currency: 'vnd',
    };
    const tree = renderer.create(<Home {...props} />);
    const Item = tree.getInstance().renderItem({item: SAMPLE_ITEM});
    expect(Item.key).toBe('123abc');
  });

  test('calls renderSeparator', () => {
    const key = tree.getInstance().renderSeparator();
    expect(key).not.toBeNull();
  });
});

describe('mapDispatchToProps', () => {
  it('returns bound function to dispatch', () => {
    const dispatchProps = mapDispatchToProps();
    expect(dispatchProps).toEqual({
      fetchFakeData: expect.any(Function),
    });
  });
});

describe('mapStateToProps', () => {
  it('state for language', () => {
    const initialState = {
      general: {listTransactions: null, fetchingData: false},
    };
    expect(mapStateToProps(initialState).listTransactions).toBeNull();
    expect(mapStateToProps(initialState).fetchingData).toBeFalsy();
  });
});
