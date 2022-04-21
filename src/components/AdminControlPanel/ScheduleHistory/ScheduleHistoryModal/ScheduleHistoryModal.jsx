import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Btn from './Button';
import {
  format,
  getISOWeek,
  nextSunday,
  parseISO,
  addDays,
  eachDayOfInterval,
  getWeek,
} from 'date-fns';
import DesktopHistoryView from './DesktopHistoryView';
import { Paper } from '@mantine/core';

export default function ScheduleHistoryModal({ shift }) {
  const [isOpen, setIsOpen] = useState(false);

  const openScheduleHistoryModal = (shift) => {
    console.log(shift);
    setIsOpen(true);
  };

  const closeScheduleHistoryModal = async () => {
    setIsOpen(false);
  };

  const datesArr = useRef(null);

  useEffect(() => {
    const start = nextSunday(parseISO(shift.date));
    const end = addDays(start, 5);
    datesArr.current = eachDayOfInterval({ start, end });
  }, [shift]);

  // if schedule is published, date passed or going to be published
  const handleStatusText = () => {
    // const upcomingSunday = parseISO(nextSunday(shift.date));
    const upcomingSunday = getWeek(parseISO(shift.date));
    console.log(upcomingSunday);
    // return <p>{getISOWeek(upcomingSunday)}</p>;
  };

  return (
    <>
      <p className="underline cursor-pointer" onClick={() => openScheduleHistoryModal(shift)}>
        {shift.name}
      </p>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-40"
          onClose={closeScheduleHistoryModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                dir="rtl"
                className="inline-block w-11/12 p-6 my-8 overflow-auto text-right align-middle transition-all transform bg-white rounded-lg shadow-xl lg:w-8/12"
              >
                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                  סידור עבודה
                </Dialog.Title>
                <div dir="rtl" className="mt-2">
                  <div className="my-5 modal__section">
                    <p className="font-medium">{shift.name}</p>
                    <Paper className="w-4/6 m-5" shadow="sm" p="sm" withBorder>
                      <div className="flex">
                        <p className="ml-2 font-medium">פורסם ע"י:</p>
                        <p>{shift.savedBy}</p>
                      </div>
                      <div className="flex">
                        <p className="ml-2 font-medium">תאריך פרסום:</p>
                        <p>{format(parseISO(shift.date), 'dd-MM-yyyy')}</p>
                      </div>
                      <div className="flex">
                        <p className="ml-2 font-medium">סטטוס:</p>
                        <p>{shift && handleStatusText()}</p>
                      </div>
                    </Paper>
                  </div>
                  <div className="my-5 modal__section">
                    {shift && (
                      <DesktopHistoryView
                        className="text-sm"
                        table={shift.data}
                        datesArr={datesArr.current}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Btn name="סגור" color="blue" onClick={closeScheduleHistoryModal} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
