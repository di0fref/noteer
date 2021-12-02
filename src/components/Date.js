var moment = require('moment');

function Date({date}){
    let formattedDate = moment(date).format("YYYY-mm-dd HH:ii");

    console.log(formattedDate);
    return(
        {formattedDate}
    )
}

export default Date