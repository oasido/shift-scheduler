import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const UserComponent = ({ id, name }) => {
  const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
    id: id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      // style={style}
      className="text-xl font-medium mb-0.5 border-r-4 border-gray-400 select-none p-0.5 pr-3"
      style={style}
    >
      {name}
    </div>
  );
};

export default UserComponent;
