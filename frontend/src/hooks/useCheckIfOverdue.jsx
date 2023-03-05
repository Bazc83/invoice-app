import { useState } from 'react';

import { formatDistanceToNowStrict, isPast, parseISO } from 'date-fns';

const useCheckIfOverdue = () => {
  const dateRegex = /^\d{4}[/-](0[1-9]|1[012])[/-](0[1-9]|[12][0-9]|3[01])$/;

  const [isOverdue, setIsOverdue] = useState(false);
  const [distanceFromToday, setDistanceFromToday] = useState('');

  const checkIfOverdue = (dueDate) => {
    if (!dateRegex.test(dueDate)) return 'Date must be YYYY-MM-DD';

    const due = parseISO(dueDate);

    const overdue = isPast(due);

    if (overdue) {
      setIsOverdue(true);
    } else {
      setIsOverdue(false);
    }

    const distance = formatDistanceToNowStrict(due, {
      unit: 'day',
    });

    if (distance === '0 days') {
      return setDistanceFromToday('Today');
    }

    if (overdue) {
      return setDistanceFromToday(`-${distance}`);
    }

    return setDistanceFromToday(`${distance}`);
  };

  return { checkIfOverdue, isOverdue, distanceFromToday };
};
export default useCheckIfOverdue;
