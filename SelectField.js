/* eslint-disable indent */
/**
 *
 * SelectField
 *
 */
// NOTE Use 'required' on SelectField and <option value="" hidden/> to display a faded default value
// NOTE Example:

// handleChange = e => {
//   e.preventDefault();
//   const { name, value } = e.target;
//   this.setState({ [name]: value });
// };

// <SelectField
//  required
//  label="PTO Type"
//  name="ptoType"
//  value={ptoType || ''}
//  border={this.state.typeBorder}
// onChange={this.handleChange}
//  >
//  <option value="" hidden />
//  {data.map(type => (
//    <option key={type.PTOID} value={type.PTOID}>
//     {type.NameX}
//    </option>
//  ))}
// </SelectField>;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'rebass';

const StyledCard = styled(Card)`
   width: ${props => (props.width ? props.width : '200px')};
   height: ${props => (props.height ? props.height : '45px')};
   border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
   margin-top: ${props =>
      props.marginTop || props.mt ? props.marginTop || props.mt : '17px'};
`;

const StyledSelectField = styled.select`
   color: ${props => (props.color ? props.color : '#000000')};
   outline: none;
   font-family: inherit;
   padding: ${props =>
      props.padding || props.p ? props.padding || props.p : '12px'};
   transition: all 0.25s linear;
   box-sizing: border-box;
   border: ${props => {
      if (props.error) {
         return props.errorBorder || '1px solid red';
      }
      return props.border || '1px solid #909090';
   }};
   ::-webkit-datetime-edit {
      opacity: ${props => props.value === '' && '0.6'};
   }
   background: ${props => props.background || props.bg || 'none'};
   border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
   width: 100%;
   height: 100%;
   :invalid {
      color: gray;
   }
   ::placeholder {
      color: ${props => (props.color ? props.color : '#000000')};
   }

   :hover {
      ::-webkit-datetime-edit {
         opacity: 1;
      }
      color: ${props =>
         props.colorHover ? props.colorHover : props.color || '#000000'};
      border: ${props => {
         if (props.error) {
            return props.errorBorder || '1px solid red';
         }
         return props.borderHover
            ? props.borderHover
            : props.border || '1px solid #000000';
      }};
      background: ${props =>
         props.backgroundHover
            ? props.backgroundHover
            : props.background || props.bg || 'none'};
      cursor: text;
      ::placeholder {
         opacity: 1;
      }
   }
   :focus {
      outline-offset: 0;
      color: ${props =>
         props.colorFocus ? props.colorFocus : props.color || '#000000'};
      border: ${props => {
         if (props.error) {
            return props.errorBorder || '1px solid red';
         }
         return props.borderFocus
            ? props.borderFocus
            : props.border || '1px solid #2e66ff';
      }};
      background: ${props =>
         props.backgroundFocus
            ? props.backgroundFocus
            : props.background || props.bg || 'none'};
      ::placeholder {
         opacity: 0;
      }
   }
`;

const StyledLegend = styled.legend`
   color: ${props => (props.labelColor ? props.labelColor : '#000000')};
   outline: none;
   pointer-events: none;
   font-size: 12px;
   transition: all 0.25s ease-in-out;
   position: absolute;
   box-sizing: border-box;
`;

class SelectField extends React.PureComponent {
   state = {
      focused: false,
      showPlaceholder: true
   };

   handleFocus = () => {
      this.setState({ focused: true, showPlaceholder: false });
   };

   handleBlur = () => {
      if (this.props.value) {
         this.setState({ showPlaceholder: true });
      } else {
         this.setState({ focused: false, showPlaceholder: true });
      }
   };

   render() {
      const {
         type,
         name,
         value,
         label,
         labelColor,
         error,
         errorText,
         placeholder,
         required,
         children,
         ...rest
      } = this.props;

      return (
         <StyledCard
            {...rest}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
         >
            <StyledLegend
               labelColor={labelColor}
               style={{
                  opacity: `${this.state.focused ? 1 : 0}`,
                  transform: `${
                     this.state.focused
                        ? 'translate(0, -18px)'
                        : 'translate(10px, 0)'
                  }`
               }}
            >
               {label}
            </StyledLegend>
            <StyledSelectField
               // ref="yearSelect"
               error={error}
               required={required}
               placeholder={placeholder || ''}
               value={value || ''}
               type={type || 'text'}
               name={name}
            >
               {this.state.showPlaceholder && <option value="">{label}</option>}
               {children}
            </StyledSelectField>
         </StyledCard>
      );
   }
}

SelectField.propTypes = {
   children: PropTypes.node.isRequired
};

export default SelectField;
