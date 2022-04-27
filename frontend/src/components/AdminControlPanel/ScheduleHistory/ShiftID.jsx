import { useRef, useState } from 'react';
import { Popover, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

const ShiftID = (props) => {
  const { shift, shiftsAmount, currentIndex } = props;
  const [opened, setOpened] = useState(false);
  const clipboard = useClipboard({ timeout: 500 });

  const currentRowNumber = useRef(shiftsAmount - currentIndex);

  const copyID = (shift) => {
    // copy id of shift
    clipboard.copy(shift._id);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="right"
      placement="center"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="pop-top-left"
      width={220}
      styles={{ body: { pointerEvents: 'none' } }}
      target={
        <span
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
          onClick={() => copyID(shift)}
          className="table-cell cursor-pointer text-slate-700"
        >
          {currentRowNumber.current}
        </span>
      }
    >
      {shift && (
        <div>
          <Text size="sm" weight={500}>
            Shift ID:
          </Text>
          <Text size="sm">{shift._id}</Text>
          <Text size="sm" weight={500}>
            Click to copy!
          </Text>
        </div>
      )}
    </Popover>
  );
};

export default ShiftID;
