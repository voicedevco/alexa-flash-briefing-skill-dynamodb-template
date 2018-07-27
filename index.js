console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res.Item),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'GET':
            var params = {};
            params.TableName = "NameOfYourTable";
            var thedate = dateHelper();
            console.log(thedate);
            params.Key = {updateDate : thedate};
            console.log(params);
            dynamo.getItem(params, done); 
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
    
    function dateHelper(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        
        if(dd<10) {
            dd = '0'+dd;
        } 
        
        if(mm<10) {
            mm = '0'+mm;
        } 
        
        today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.0Z';
        return today;
    }
};


