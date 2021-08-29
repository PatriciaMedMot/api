const app = require('../config/express')
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log('servidor online ' + process.env.PORT);
})