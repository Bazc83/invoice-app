export const useFormatDate = () => {
  const monthsOfTheYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const getDate = (dateToFormat) =>{
    const splitDate = dateToFormat.split('-');

    const year = splitDate[0];
    const month = monthsOfTheYear[+splitDate[1] - 1];
    const day = splitDate[2];
    const dueDate = `Due ${day} ${month} ${year}`;
    return dueDate;
  }


  return { getDate };
};
