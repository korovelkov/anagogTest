import React from 'react';
import { Header } from '../Header';
import renderer from 'react-test-renderer';

it('render Header', () => {
  const tree = renderer.create(<Header userName="userName" logout={() => {}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
