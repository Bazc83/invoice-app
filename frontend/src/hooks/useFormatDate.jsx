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
  const getDate = (dateToFormat) => {
    if (!dateToFormat) return dateToFormat;
    const splitDate = dateToFormat.split('-');

    const year = splitDate[0].split('')[2] + splitDate[0].split('')[2];
    const month = monthsOfTheYear[+splitDate[1] - 1];
    const day = splitDate[2];
    const dueDate = `${day} ${month} ${year}`;
    return dueDate;
  };

  return { getDate };
};

export default useFormatDate;
