import React from 'react';
import { Login } from '../Login';
import renderer from 'react-test-renderer';

it('render Login', () => {
  const tree = renderer.create(<Login login={() => {}} name="name" error={null} />).toJSON();

  expect(tree).toMatchSnapshot();
});
