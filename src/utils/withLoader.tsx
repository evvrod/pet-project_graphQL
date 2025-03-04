import React from 'react';

import { Loader } from 'UI components/index';

interface IWithLoaderProps {
  isLoading: boolean;
}

export function withLoader<T extends object>(
  Component: React.ComponentType<T>,
) {
  return function WrappedComponent(props: T & IWithLoaderProps) {
    const { isLoading, ...restProps } = props;

    return (
      <div style={containerStyles}>
        <Component {...(restProps as T)} />
        {isLoading && (
          <div style={loaderWrapperStyles}>
            <Loader />
          </div>
        )}
      </div>
    );
  };
}

const containerStyles: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const loaderWrapperStyles: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
