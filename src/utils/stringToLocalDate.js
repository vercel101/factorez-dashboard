const localDate = (dateString) => {
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   let dateFn = new Date(dateString);//"2023-06-30T12:16:16.624Z"
   var year = dateFn.getFullYear();
   var month = months[dateFn.getMonth()];
   var date = dateFn.getDate();
   return `${date}-${month}-${year}`;
}

module.exports = {localDate}