AWS.config.update({
    region: "ap-southeast-1",
    endpoint: 'http://localhost:8000/',
    accessKeyId: "AKIAV2ETM6QXC3DCEXPC",
    secretAccessKey: "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"
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

function createItem() {
    const year= Number(document.getElementById("year").value);
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    var params = {
        TableName :"Movies",
        Item:{
            "year":year,  
            "title":title,
            "image":image,
            "info":{
                "plot": "Nothing happens at all.",
                "rating": 0
            }
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            document.getElementById('createItem').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('createItem').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            
        }
    });
}


function scanData() {
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Scanning for movies between 1950 and 1975." + "\n";

    var params = {
        TableName: "Movies"
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            // Print all the movies
            document.getElementById('textarea').innerHTML += "Scan succeeded: " + "\n";
            data.Items.forEach(function(movie) {
                document.getElementById('scanData').innerHTML += movie.year + ": " + movie.title + " - rating: " + movie.info.rating + "\n";
                document.getElementById('imageItem').src+= movie.image;
            });
        }
    }
}