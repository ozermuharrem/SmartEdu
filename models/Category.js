const mongoose = require('mongoose');
const slugify = require('slugify')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name : {
        type: String,
        unique : true ,// bu isimden tek bir tane olması için isim den 
        required : true //  zorunlu olarak doldurulması gereken alan 

    },
    slug:{
        type:String,
        unique:true
    }
})

CategorySchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        lower:true, //slug küçük harfe çevirecek
        strict:true // sadece string karekterlerden devam edecek yani : , ! vs karekterler olmayacak
    })
    next(); // bir sonraki midlleware ye geçmesi için
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category;