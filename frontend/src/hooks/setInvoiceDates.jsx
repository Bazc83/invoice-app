import { addDays, formatISO, parseISO } from 'date-fns';

export const setInvoiceDates = (createdAtDate) => {
  const newDate = new Date();

  const createdAt = createdAtDate ? parseISO(createdAtDate) : '';

  const addFifteenDays = addDays(createdAtDate ? createdAt : newDate, 15);
  const addTwentyOneDays = addDays(createdAtDate ? createdAt : newDate, 21);

  const todaysDate = formatISO(createdAtDate ? createdAt : newDate, {
    representation: 'date',
  });

  const fifteenDays = formatISO(addFifteenDays, { representation: 'date' });
  const twentyOneDays = formatISO(addTwentyOneDays, { representation: 'date' });

  return { todaysDate, fifteenDays, twentyOneDays };
};
