export const DataBrasil = ({ data }) => {
  let actualData;

  if (data && data.length > 10) {
    actualData = data.substring(0, 10).split('-');
  } else if (data && data.length <= 10) {
    actualData = data.includes('/') ? data.split('/') : data.split('-');
  } else if (data && typeof actualData == 'undefined') {
    actualData = new Date(data);
    actualData = [
      actualData.getDate(),
      actualData.getMonth() + 1,
      actualData.getFullYear()
    ];
  }

  return actualData.reverse().join('/'); //ano/mes/dia
};
