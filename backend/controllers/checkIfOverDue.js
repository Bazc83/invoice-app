const dateFns = require('date-fns');

// check if todays date is greater than due date

// if todays date is greater than due date mark as OVERDUE

// if todays date is less than due date return number of days until due date
const paymentDue = '2023-10-05';

const dateRegex = /^\d{4}[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$/;

const checkIfOverdue = (dueDate) => {
  if (!dateRegex.test(dueDate)) return 'Date must be YYYY-MM-DD';

  const due = dateFns.parseISO(dueDate);

  const isOverDue = dateFns.isPast(due);

  const distanceFromToday = dateFns.formatDistanceToNowStrict(due, {
    unit: 'day',
  });
  if (isOverDue) {
    return `Overdue by ${distanceFromToday}`;
  } else {
    return `Payment due in ${distanceFromToday}`;
  }
};

console.log(checkIfOverdue(paymentDue));
