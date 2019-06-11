/* eslint-disable indent */
/**
 *
 * SelectField
 *
 */
// NOTE Use 'required' on SelectField and <option value="" hidden>Your default value here</option> to display a faded default value
// NOTE Example:
// <SelectField
// required
// <option value="" hidden>
//   PTO Type
// </option>
// {data.map(type => (
//   <option key={type.PTOID} value={type.PTOID}>
//     {type.NameX}
//   </option>
// ))}
// </SelectField>
// </div>

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'rebass';

const StyledSelectField = styled.select`
  outline: none;
  font-family: inherit;
  padding: ${props => (props.padding ? props.padding : '12px')};
  transition: all 0.25s linear;
  margin: 0;
  box-sizing: border-box;
  border: ${props => (props.border ? props.border : '1px solid #909090')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  width: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '300px')};
  min-width: 144px;
  :invalid {
    color: gray;
  }
  :hover {
    border: solid 1px black;
    color: black;
    ::placeholder {
      color: black;
      opacity: 1;
    }
  }
  :focus {
    outline-offset: 0;
    border: solid 1px #2e66ff;
    color: black;
    ::placeholder {
      opacity: 0;
    }
  }
`;

class SelectField extends React.PureComponent {
  state = {
    focused: false,
    showPlaceholder: true,
  };

  handleHover = () => {
    if (this.props.value) {
      this.setState({ focused: true });
    }
  };

  handleFocus = () => {
    this.setState({ focused: true, showPlaceholder: false });
  };

  handleBlur = () => {
    if (this.props.value) {
      this.setState({ focused: true });
    } else {
      this.setState({ focused: false, showPlaceholder: true });
    }
  };

  render() {
    const { ...props } = this.props;

    return (
      <Card
        m={props.margin || props.m || 0}
        mt={props.mt || 3}
        p={0}
        bg={props.bg}
        borderRadius={props.borderRadius || '6px'}
        width={props.width}
      >
        <legend
          style={{
            fontSize: '12px',
            opacity: `${this.state.focused ? 1 : 0}`,
            transition: 'all .25s ease-in-out',
            position: 'absolute',
            boxSizing: 'border-box',
            transform: `${
              this.state.focused ? 'translate(0, -18px)' : 'translate(10px, 0)'
            }`,
          }}
        >
          {props.label}
        </legend>
        <StyledSelectField
          {...props}
          value={props.value}
          name={props.name}
          onMouseOver={this.handleHover}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {this.state.showPlaceholder ? (
            <option value="" hidden>
              {props.label}
            </option>
          ) : (
            <option label="" hidden>
              {props.label}
            </option>
          )}

          {props.children}
        </StyledSelectField>
      </Card>
    );
  }
}

SelectField.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelectField;
