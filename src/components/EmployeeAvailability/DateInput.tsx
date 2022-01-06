import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { format } from 'date-fns';

import he from 'date-fns/locale/he';

export default function DateInput({ className }) {
  const [selected, setSelected] = useState<Date>();

  let footer = 'יש לבחור תאריך';
  if (selected) {
    footer = `${format(selected, 'EEEE, d LLLL yyyy', { locale: he })}.`;
    console.log(selected);
  }
  return <DayPicker className={className} dir="rtl" locale={he} mode="single" selected={selected} onSelect={setSelected} footer={footer} />;
}
