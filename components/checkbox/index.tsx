/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { classnames } from '../_utils/index';
import * as CSS from 'csstype';
import { Icon, Cell } from '../index';
import Group from './Group';
import './index.less';

export type CheckboxValueType = string | number;

interface CheckboxProps {
  value?: CheckboxValueType;
  checked?: boolean; // 是否选中
  defaultChecked?: boolean; // 是否选中
  disabled?: boolean; // 是否禁用
  shape?: 'square' | 'round'; // 图标形状
  color?: CSS.Property.Color; // 选中颜色
  cell?: boolean; // 是否配合cell使用
  onChange?: (checked: boolean) => unknown;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Checkbox(props: CheckboxProps) {
  const {
    value,
    checked,
    defaultChecked,
    shape,
    color,
    cell,
    disabled,
    children,
    className,
    style
  } = props;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  function onChange(event: React.ChangeEvent<HTMLInputElement> | boolean) {
    let inputChecked;
    if (typeof event === 'boolean') {
      inputChecked = event;
    } else {
      event.persist && event.persist();
      inputChecked = event.currentTarget.checked;
    }
    props.onChange(inputChecked);
    // 如果是非受控模式，内部处理
    if (checked === undefined) {
      setIsChecked(inputChecked);
    }
  }
  function renderIcon() {
    return (
      <div
        className={classnames({
          'sty-checkbox-icon': true,
          [`sty-checkbox-icon-${shape}`]: true,
          'sty-checkbox-icon-checked': isChecked
        })}
      >
        <Icon
          type='success'
          style={{
            backgroundColor: isChecked && color,
            borderColor: isChecked && color
          }}
        />
      </div>
    );
  }

  if (cell) {
    return (
      <Cell
        className={classnames({
          'sty-checkbox-cell': true,
          'sty-checkbox-disabled': disabled
        })}
        center
        title={children}
        onClick={() => onChange(!isChecked)}
      >
        {renderIcon()}
      </Cell>
    );
  }

  return (
    <label
      className={classnames({
        [className]: className,
        'sty-checkbox': true,
        'sty-checkbox-disabled': disabled
      })}
      style={style}
    >
      <input
        type='checkbox'
        disabled={disabled}
        value={value || ''}
        onChange={onChange}
        checked={isChecked}
      />
      {renderIcon()}
      <div className={'sty-checkbox-label'}>{children}</div>
    </label>
  );
}

Checkbox.defaultProps = {
  disabled: false,
  defaultChecked: false,
  shape: 'square',
  onChange: () => undefined
};

Checkbox.CheckboxGroup = Group;

export default Checkbox;