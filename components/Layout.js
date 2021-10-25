import React from 'react';
import Meta from './Meta';

export const Layout = ({ children }) => (
  <>
    <Meta />

    <div>{children}</div>
  </>
);

export default { Layout };
