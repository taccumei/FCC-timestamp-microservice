// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/:date", (req, res) => {
  let date = new Date(req.params.date);
  
  if(isInvalidDate(date)){
    date = new Date(+req.params.date);
  }

  if(isInvalidDate(date)){
    res.json({error: "Invalid Date"});
    return;
  }

  res.json({unix : date.getTime(), utc : date.toUTCString() });
});

app.get("/api", (req, res) => {
  const current = new Date();
  res.json({
      unix: current.getTime(),
    utc: current.toUTCString()
  })
});

//     let reg = /^\d+$/;
//     let numbersOnlytest = reg.test(date.toString());

//     if(numbersOnlytest){
//         let parseIntDate = parseInt(date);
//         let utc = new Date(parseIntDate).toUTCString();
//         return res.json({unix : parseIntDate, utc : utc });
//     }else{
//         let unix = new Date(date).getTime();
//         let utc = new Date(date).toUTCString();
//         res.json({unix: unix, utc: utc});
//       }
//   }
// });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
