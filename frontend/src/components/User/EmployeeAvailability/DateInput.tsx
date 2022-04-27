import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import he from 'date-fns/locale/he';

export default function DateInput(props) {
  return (
    <DayPicker
      className="scale-[1.15] m-10 md:scale-[1.35] md:m-20 "
      dir="rtl"
      locale={he}
      mode="single"
      selected={props.selected}
      onSelect={props.setSelected}
      footer={props.footer}
      disabled={{ before: props.today }}
    />
  );
}
