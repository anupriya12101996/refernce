const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://sillypost:sillypost123@sillypost.qrqht.mongodb.net/?retryWrites=true&w=majority").then(()=>{
console.log(`connection successful`);
}).catch((e)=>{
console.log(`no connection`);
})