import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Mobile: React.FC = ({ children }) => {
  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });
  return <>{isMobile && children}</>;
};

const PC: React.FC = ({ children }) => {
  const isPc = useMediaQuery({
    query: '(min-width:769px) ',
  });
  return <>{isPc && children}</>;
};

const Tablet: React.FC = ({ children }) => {
  const isTablet = useMediaQuery({
    query: '(max-width:991px)',
  });
  return <>{isTablet && children}</>;
};

const Desktop: React.FC = ({ children }) => {
  const isDesktop = useMediaQuery({
    query: '(min-width:992px)',
  });
  return <>{isDesktop && children}</>;
};

export { Mobile, PC, Tablet, Desktop };
