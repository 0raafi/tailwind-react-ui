import React from 'react'

import '../styles/index.css';

export interface ButtonProps {
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { children } = props || {};

  return (
    <div className="px-2 my-[40px]">{children}</div>
  )
}
