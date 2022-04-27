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

  const iterateDays = (i) => {
    let day;
    switch (i) {
      case 0:
        day = sunday;
        break;
      case 1:
        day = monday;
        break;
      case 2:
        day = tuesday;
        break;
      case 3:
        day = wednesday;
        break;
      case 4:
        day = thursday;
        break;
      default:
        break;
    }

    return (
      <div key={`column-${i}`}>
        <SortableContext
          items={day.map((employee) => employee.id)}
          strategy={verticalListSortingStrategy}
          key={`sortable-context-${i}`}
        >
          {day.map((employee, i) => {
            if (day.length - 2 <= i) {
              return (
                <div className="relative" key={`day-${i}`}>
                  <p className="schedule__desktop-view-list">ערב</p>
                  <UserComponent
                    name={employee.username}
                    id={employee.id}
                    key={`${employee.id}-${i}`}
                  />
                </div>
              );
            } else if (day.length - 4 <= i) {
              return (
                <div className="relative" key={`day-${i}`}>
                  <p className="schedule__desktop-view-list">אמצע</p>
                  <UserComponent
                    name={employee.username}
                    id={employee.id}
                    key={`${employee.id}-${i}`}
                  />
                </div>
              );
            } else {
              return (
                <UserComponent
                  name={employee.username}
                  id={employee.id}
                  key={`${employee.id}-${i}`}
                />
              );
            }
          })}
        </SortableContext>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-6">
        {table && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            key="dnd-context-0"
          >
            {[...Array(5)].map((_, i) => {
              return iterateDays(i);
            })}

            <div key={`day-${5}`}>
              <SortableContext
                items={friday.map((employee) => employee.id)}
                strategy={verticalListSortingStrategy}
                key={`sortable-context-${5}`}
              >
                {friday.map((employee) => (
                  <UserComponent
                    name={employee.username}
                    id={employee.id}
                    key={`${employee.id}-${5}`}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        )}
      </div>
    </>
  );
}
