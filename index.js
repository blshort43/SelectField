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
import { Box, Card } from 'rebass';

const RebassTextfield = styled(Card)`
  outline: none;
  border-radius: 4px;
  font-family: inherit;
  height: 56px;
  padding-left: 12px;
  min-width: 180px;
  white-space: nowrap;

  :invalid {
    color: gray;
  }
  :hover {
    border: solid 1px black;
    color: black;
  }
  :focus {
    border: 1.5px solid #3a71ff;
    color: black;
  }
`;

class SelectField extends React.PureComponent {
  state = {
    opacity: '0',
  };

  componentDidMount() {
    if (this.props.value === '' || this.props.value === null) {
      this.setState({ opacity: '0' });
    }
  }

  showLabel = () => {
    this.setState({ opacity: '1' });
  };

  hideLabel = e => {
    const { value } = e.target;

    if (value === '') {
      this.setState({ opacity: '0' });
    }
  };

  render() {
    const { ...props } = this.props;
    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'fit-content',
        }}
        margin={this.props.margin}
        marginTop={this.props.marginTop}
        marginLeft={this.props.marginLeft}
        marginRight={this.props.marginRight}
      >
        <legend
          style={{
            fontSize: '12px',
            opacity: `${this.state.opacity}`,
            transition: 'opacity .25s ease-in-out',
            marginTop: '-18px',
          }}
        >
          {props.label}
        </legend>
        <RebassTextfield
          {...props}
          as="select"
          margin="0"
          marginTop="0"
          marginLeft="0"
          marginRight="0"
          border={!this.props.border ? '1px solid #909090' : props.border}
          onFocus={this.showLabel}
          onBlur={this.hideLabel}
        >
          {props.children}
        </RebassTextfield>
      </Box>
    );
  }
}

SelectField.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelectField;
