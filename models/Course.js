const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name : {
        type: String,
        unique : true ,// bu isimden tek bir tane olması için isim den 
        required : true //  zorunlu olarak doldurulması gereken alan 

    },
    image : String,
    title : String,
    description : {
        type: String,
        required : true, //  zorunlu olarak doldurulması gereken alan 
        trim : true // girilen string değerin başında ve sonunda ki boşluları kaldırmak için
    } ,
    createDate : {
        type : Date,
        default : Date.now
    }
})

const Course = mongoose.model('courses', courseSchema)

module.exports = Course;