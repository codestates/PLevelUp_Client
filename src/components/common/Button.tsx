import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import React, { Key, MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  fullWidth?: boolean;
  cyan?: boolean;
  children?: ReactNode;
  key?: Key;
  to?: string;
  onClick: (e: MouseEventHandler<HTMLButtonElement>) => void;
};

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};

  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props: ButtonProps) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props: ButtonProps) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};

      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

export default function Button(props: any) {
  return props.to ? (
    // a 태그는 boolean 타입의 임의 props 를 허용하지 않기에 1과 0 으로 변환시켜 준다.
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
}
