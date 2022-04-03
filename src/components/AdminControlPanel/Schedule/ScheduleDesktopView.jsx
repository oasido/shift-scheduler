import React, { useEffect } from 'react';
import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import UserComponent from './UserComponent';

export default function ScheduleDesktopView({
  table,
  setTable,
  datesArr,
  sunday,
  setSunday,
  monday,
  setMonday,
  tuesday,
  setTuesday,
  wednesday,
  setWednesday,
  thursday,
  setThursday,
  friday,
  setFriday,
}) {
  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      // active.id.slice(0, 1) checks the day ID of the dragged item (0 - sunday, 5 - friday)
      if (active.id.slice(0, 1) === `0`) {
        setSunday((prevTable) => {
          const oldIndex = sunday.findIndex((employee) => employee.id === active.id);
          const newIndex = sunday.findIndex((employee) => employee.id === over.id);

          return arrayMove(sunday, oldIndex, newIndex);
        });
      }
      if (active.id.slice(0, 1) === `1`) {
        setMonday((prevTable) => {
          const oldIndex = monday.findIndex((employee) => employee.id === active.id);
          const newIndex = monday.findIndex((employee) => employee.id === over.id);

          return arrayMove(monday, oldIndex, newIndex);
        });
      }
      if (active.id.slice(0, 1) === `2`) {
        setTuesday((prevTable) => {
          const oldIndex = tuesday.findIndex((employee) => employee.id === active.id);
          const newIndex = tuesday.findIndex((employee) => employee.id === over.id);

          return arrayMove(tuesday, oldIndex, newIndex);
        });
      }
      if (active.id.slice(0, 1) === `3`) {
        setWednesday((prevTable) => {
          const oldIndex = wednesday.findIndex((employee) => employee.id === active.id);
          const newIndex = wednesday.findIndex((employee) => employee.id === over.id);

          return arrayMove(wednesday, oldIndex, newIndex);
        });
      }
      if (active.id.slice(0, 1) === `4`) {
        setThursday((prevTable) => {
          const oldIndex = thursday.findIndex((employee) => employee.id === active.id);
          const newIndex = thursday.findIndex((employee) => employee.id === over.id);

          return arrayMove(thursday, oldIndex, newIndex);
        });
      }
      if (active.id.slice(0, 1) === `5`) {
        setFriday((prevTable) => {
          const oldIndex = friday.findIndex((employee) => employee.id === active.id);
          const newIndex = friday.findIndex((employee) => employee.id === over.id);

          return arrayMove(friday, oldIndex, newIndex);
        });
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-6">
        {table && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div>
              <SortableContext
                items={sunday.map((employee) => employee.id)}
                strategy={verticalListSortingStrategy}
              >
                {sunday.map((employee) => (
                  <UserComponent name={employee.username} id={employee.id} key={employee.id} />
                ))}
              </SortableContext>
            </div>

            <div>
              <SortableContext
                items={monday.map((employee) => employee.id)}
                strategy={verticalListSortingStrategy}
              >
                {monday.map((employee) => (
                  <UserComponent name={employee.username} id={employee.id} key={employee.id} />
                ))}
              </SortableContext>
            </div>

            <div>
              <SortableContext
                items={tuesday.map((employee) => employee.id)}
                strategy={verticalListSortingStrategy}
              >
                {tuesday.map((employee) => (
                  <UserComponent name={employee.username} id={employee.id} key={employee.id} />
                ))}
              </SortableContext>
            </div>

            <div>
              <SortableContext
                items={wednesday.map((employee) => employee.id)}
                strategy={verticalListSortingStrategy}
              >
                {wednesday.map((employee) => (
                  <UserComponent name={employee.username} id={employee.id} key={employee.id} />
                ))}
              </SortableContext>
            </div>

            <div>
              <SortableContext
                items={thursday.map((employee) => employee.id)}
                strategy={verticalListSortingStrategy}
              >
                {thursday.map((employee) => (
                  <UserComponent name={employee.username} id={employee.id} key={employee.id} />
                ))}
              </SortableContext>
            </div>

            <div>
              <SortableContext
                items={friday.map((employee) => employee.id)}
                strategy={verticalListSortingStrategy}
              >
                {friday.map((employee) => (
                  <UserComponent name={employee.username} id={employee.id} key={employee.id} />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        )}
      </div>
    </>
  );
}
