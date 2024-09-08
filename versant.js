    const express=require('express');
    const mongoose=require('mongoose');
    const path= require('path');
    const bodyParser = require('body-parser');

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false}));
    

const port = 5000; 

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res)=> {

 res.sendFile(__dirname + '/public/index.html');
}) 

console.log(__dirname + '/public/index.html');    

mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongo is connected')
})


const Schema = mongoose.Schema;

const dataSchema = new Schema({
    Name: String,
    Phone: String,
    TIN: String,
    Email: String,
    });


    const Data = mongoose.model('Data', dataSchema);

    app.post('/submit', (req,res)=>{
        const {Name,Phone,TIN,Email}=req.body;
        const newData = new Data({
            Name:Name,
            Phone:Phone,
            TIN:TIN,
            Email:Email

    })
    newData.save();

    res.redirect('/')
    })





app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})
