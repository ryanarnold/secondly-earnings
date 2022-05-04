import React from 'react';

interface Props {
  children: any;
}

function Layout({ children }: Props) {
  return <div>{children}</div>;
}

export default Layout;
