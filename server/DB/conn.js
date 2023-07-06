const mongoose = require('mongoose');

const uri = process.env.DATABASE;

const connectionParams = {
  useNewUrlParser : true,
  useUnifiedTopology : true

};

mongoose.connect(uri, connectionParams).then(() => {console.log('DB connected')}).catch((e) => {console.log(e)} );
