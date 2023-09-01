const localDate = (dateString) => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let dateFn = new Date(dateString); //"2023-06-30T12:16:16.624Z"
    var year = dateFn.getFullYear();
    var month = months[dateFn.getMonth()];
    var date = dateFn.getDate();
    return `${date}-${month}-${year}`;
};

const localDateInIndiaTime = (dateString) => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let dateFn = new Date(dateString).getTime(); //"2023-06-30T12:16:16.624Z"
   //  let dateWithIndiaTime = new Date(dateFn + 5 * 3600 * 1000 + 1800 * 1000);
    let dateWithIndiaTime = new Date(dateString);
    var year = dateWithIndiaTime.getFullYear();
    var month = months[dateWithIndiaTime.getMonth()];
    var date = dateWithIndiaTime.getDate();

    date = date < 10 ? "0" + date : date;
    let hr = dateWithIndiaTime.getHours();
    let min = dateWithIndiaTime.getMinutes();
    hr = hr % 12 || 12;
    hr = hr < 10 ? "0" + hr : hr;
    min = min < 10 ? "0" + min : min;
    let ampm = dateWithIndiaTime.getHours() < 12 ? "AM" : "PM";

    return `${date}-${month}-${year} ${hr}:${min} ${ampm}`;
};

module.exports = { localDate,localDateInIndiaTime };
