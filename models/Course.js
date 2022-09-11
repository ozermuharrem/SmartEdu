const mongoose = require('mongoose');
const slugify = require('slugify')

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name : {
        type: String,
        unique : true ,// bu isimden tek bir tane olması için isim den 
        required : true //  zorunlu olarak doldurulması gereken alan 

    },
    description : {
        type: String,
        required : true, //  zorunlu olarak doldurulması gereken alan 
        trim : true // girilen string değerin başında ve sonunda ki boşluları kaldırmak için
    } ,
    createDate : {
        type : Date,
        default : Date.now
    },
    slug:{
        type:String,
        unique:true
    }
})

courseSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        lower:true, //slug küçük harfe çevirecek
        strict:true // sadece string karekterlerden devam edecek yani : , ! vs karekterler olmayacak
    })
    next(); // bir sonraki midlleware ye geçmesi için
})

const Course = mongoose.model('courses', courseSchema)

module.exports = Course;