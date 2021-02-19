/**
 * @format
 */

import '../frontend/node_modules/react-native';
import React from 'react';
import App from '../frontend/App';

// Note: test renderer must be required after react-native.
import renderer from '../frontend/node_modules/react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
