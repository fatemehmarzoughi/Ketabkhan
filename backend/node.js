const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('images'));

app.get('/' , (req , res) => {
    res.sendFile(path.join(__dirname , '/bookCover4.jpg'));
})

app.listen(3000, () => console.log('listen  on port 3000'));