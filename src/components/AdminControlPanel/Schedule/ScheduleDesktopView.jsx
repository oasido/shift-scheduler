import React, { Fragment, useState } from 'react';
import { isFriday } from 'date-fns';
import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import UserComponent from './UserComponent';

export default function ScheduleDesktopView({ table, setTable, datesArr }) {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Manoj',
    },
    {
      id: '2',
      name: 'John',
    },
    {
      id: '3',
      name: 'Ronaldo',
    },
    {
      id: '4',
      name: 'Harry',
    },
    {
      id: '5',
      name: 'Jamie',
    },
  ]);

  const sensors = [useSensor(PointerSensor)];

  // const handleDragEnd = ({ active, over }) => {
  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.findIndex((item) => item.id === active.id);
  //       const newIndex = items.findIndex((item) => item.id === over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  //   console.log(items);
  // };

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* <SortableContext
          items={table[0].map((employee) => employee._id)}
          strategy={verticalListSortingStrategy}
        > */}
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {/* {table[0].map((employee) => (
              <UserComponent name={employee.username} id={employee._id} key={employee._id} />
            ))} */}
          {items.map((item) => (
            <UserComponent {...item} key={item.id} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );

  // return (
  //   <div className="table-row-group">
  //     <div className="table-row font-semibold text-lg">
  //       {table &&
  //         datesArr.map((e, i) => {
  //           return (
  //             <Fragment key={i}>
  //               <div className="table-cell" key={i}>
  //                 {table[i].map((employee, employeeIndex) => {
  //                   return (
  //                     <div
  //                       className="whitespace-nowrap odd:bg-white even:bg-slate-50"
  //                       key={employee._id}
  //                     >
  //                       <p
  //                         key={employee._id}
  //                         name={`day-${i}`}
  //                         /*
  //                           - Look up entity from table according to his employee._id .
  //                           - Replace the entity's name.
  //                           - Apply the new state (table)
  //                             [ [], Shift([],[],[]), Shift([],[],[]) ]
  //                         */
  //                       >
  //                         {employee.username}
  //                       </p>
  //                     </div>
  //                   );
  //                 })}
  //               </div>
  //             </Fragment>
  //           );
  //         })}
  //     </div>
  //   </div>
  // );
}
