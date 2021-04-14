import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Mobile: React.FC = ({ children }) => {
  const isMobile = useMediaQuery({
    query: '(max-width:768px)',
  });
  return <React.Fragment>{isMobile && children}</React.Fragment>;
};

const PC: React.FC = ({ children }) => {
  const isPc = useMediaQuery({
    query: '(min-width:769px) ',
  });
  return <React.Fragment>{isPc && children}</React.Fragment>;
};

const Tablet: React.FC = ({ children }) => {
  const isTablet = useMediaQuery({
    query: '(max-width:991px)',
  });
  return <React.Fragment>{isTablet && children}</React.Fragment>;
};

const Desktop: React.FC = ({ children }) => {
  const isDesktop = useMediaQuery({
    query: '(min-width:992px)',
  });
  return <React.Fragment>{isDesktop && children}</React.Fragment>;
};

export { Mobile, PC, Tablet, Desktop };
