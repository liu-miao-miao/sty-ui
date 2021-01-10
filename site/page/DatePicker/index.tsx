import React from 'react';
import { DatePicker } from '@/components/index';

function DatePickerDemo() {
  return (
    <div style={{ background: '#fff', paddingBottom: 100 }}>
      <div className='demo-block__title'>基础用法</div>
      <DatePicker></DatePicker>
    </div>
  );
}
export default DatePickerDemo;
