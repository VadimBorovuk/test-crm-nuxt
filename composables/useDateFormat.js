import { useNuxtApp } from '#app';

export const useDateFormat = () => {
  const { $moment } = useNuxtApp();

  const getFilterDate = (data) => {
    return $moment(data).format('DD.MM.YYYY');
  };

  const getFilterFullDate = (data) => {
    return $moment(data).format('DD.MM.YYYY H:mm:ss');
  };

  const isDifferenceWithin31Days = (date1, date2) => {
    const diffInDays = date2.diff(date1, 'days');
    return Math.abs(diffInDays) <= 30;
  };

  const checkDifferenceDays = (date) => {
    const datesArray = [$moment(date[0]), $moment(date[1])];

    for (let i = 0; i < datesArray.length - 1; i++) {
      const date1 = datesArray[i];
      const date2 = datesArray[i + 1];

      if (!isDifferenceWithin31Days(date1, date2)) {
        return false;
      } else {
        return true;
      }
    }
  };

  const getFormattedDateOrg = (data) => {
    if (data) {
      let date = new Date(data);
      date.setHours(date.getHours());
      let year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');
      return day + '.' + month + '.' + year;
    } else {
      return '-';
    }
  };

  const getFormattedTimeRequest = (data) => {
    if (data) {
      let date = new Date(data);
      date.setHours(date.getHours());
      let hours = date.getHours().toString().padStart(2, '0');
      let minutes = date.getMinutes().toString().padStart(2, '0');
      let seconds = date.getSeconds().toString().padStart(2, '0');
      return hours + ':' + minutes + ':' + seconds;
    } else {
      return '-';
    }
  };

  const getUnixDate = (data, time) => {
    if (data) {
      const momentDate = $moment.unix(data);
      if (time === 'date') {
        return momentDate.format('DD.MM.YYYY');
      } else if (time === 'hours') {
        return momentDate.format('HH:mm:ss');
      }
    }
  };

  const setReverseDateForOffset = (data) => {
    if (data) {
      return $moment(data).format('YYYY-MM-DD HH:mm:ss');
    }
  };

  const getUTCTimeOffset = (date, offset, type, format) => {
    if (date) {
      let getOffset = offset - 3;
      let setOffset = -offset + 3;

      if (type === 'get') {
        if (format === 'dotts') {
          let newDate = $moment(date, 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
          return $moment(newDate).add(getOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
        } else if (format === 'reverse') {
          let newDate = $moment(date, 'HH:mm:ss DD.MM.YYYY').format('YYYY-MM-DD HH:mm:ss');
          return $moment(newDate).add(getOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
        } else if (format === 'unix') {
          const unixDate = $moment.unix(date).format('YYYY-MM-DD HH:mm:ss');
          return $moment(unixDate).format('YYYY-MM-DD HH:mm:ss');
        } else if (format === 'none') {
          return $moment(date).add(getOffset, 'hours').format('YYYY-MM-DD HH:mm:ss');
        } else if (format === 'org') {
          return $moment(date).add(getOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
        } else if (format === 'days') {
          return $moment(date).add(getOffset, 'hours').format('DD.MM.YYYY');
        }
      } else if (type === 'set') {
        if (format === 'boot') {
          return $moment(date).add(setOffset, 'hours').format('YYYY-MM-DD[T]HH:mm:ss');
        } else if (format === 'none') {
          return $moment(date).add(setOffset, 'hours').format('YYYY-MM-DD HH:mm:ss');
        } else if (format === 'dotts') {
          let newDate = $moment(date, 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
          return $moment(newDate).add(setOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
        } else if (format === 'days') {
          return $moment(date).add(setOffset, 'hours').format('YYYY-MM-DD');
        } else if (format === 'org') {
          return $moment(date, 'DD.MM.YYYY HH:mm:ss').add(setOffset, 'hours').format('DD.MM.YYYY HH:mm:ss');
        }
      }
    } else {
      return '-';
    }
  };

  return {
    getFilterDate,
    getFilterFullDate,
    isDifferenceWithin31Days,
    checkDifferenceDays,
    getFormattedDateOrg,
    getFormattedTimeRequest,
    getUnixDate,
    setReverseDateForOffset,
    getUTCTimeOffset,
  };
};
