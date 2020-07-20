import React from 'react';
import Button from '../UploadFileButton';
import renderer from 'react-test-renderer';

it('render button', () => {
  const tree = renderer.create(<Button>test</Button>).toJSON();

  expect(tree).toMatchSnapshot();
});
