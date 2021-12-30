
exports.date=function () {
    const today=new Date();
    // let currentDay= today.getDay();   
    // console.log(currentDay);
    const options={
        weekday:'long',
        day:'numeric',
        month: 'long',
        year: 'numeric'

    };

    return today.toLocaleDateString('en-US', options);
    }

exports.day= function() {
    const today=new Date();
    // let currentDay= today.getDay();
   // var day='';    
   const options={
        weekday:'long',
        day:'numeric',
        month: 'long'
    };
    return today.toLocaleDateString('en-US',options);
    
}

// console.log(module.exports);
