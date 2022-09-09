 smart edu projesi nodejs öğrenirken yaptımız çalışmaları içermektedir

 ## http status code 

 HTTP yanıt durumu kodları bizlere o anda yapılmak istenen işleme özel bir durum bilgisi gönderilir (OK, Bad Request vs..). Bu gönderilen her durumun kendine özel bir sayı ifadesi vardır (200, 201, 404 vs..)

### Neden Durum Kodları?


Örneğin biz yeni bir post ekleyeceğiz ancak frontend sayfamız hazır değil! Durum kodları sayesinde biz backend tarafında yaptığımız işlemin başarılı olup olmadığını kontrol edebiliriz.



 > sunucu ile istemci arasında temel iletişimi tcpid sağlıyor.<br>
 > http ise sunucu ile istemci arasında ki konuşma yöntemleridir.<br> 
 > http status code ise o anki yapılan işlem hk. bilgi verir<br>

 ### Sık Kullanılan Durum Kodları

+ 200 - OK
+ 201 – Created
+ 404 – Not found
+ 500 – Internal Server Error
+ 201 – Created
+ 400 – Bad Request
+ 401 – Unauthorized
+ 403 – Forbidden
+ 501 – Not Implemented


## Link Güncelleme 

Projemizde linklerin ilgili sayfaya göre aktif olmasını istiyoruz. Bunun için ilgili template dosyasın o bilgiyi `page_name` olarak gönderiyoruz. İlgili `page_name`'e ait olan değer her sayfaya göre değişiyor. Örneğin index sayfası için:

`
app.get('/', (req, res) => {<br>
  res.status(200).render('index', {<br>
      page_name: "index"<br>
  });<br>
});<br>
`
about sayfası için:

`
app.get('/about', (req, res) => {<br>
  res.status(200).render('about', {<br>
    page_name: 'about',<br>
  });<br>
}); <br>
`

"page_name" ilgili template dosyasına gönderildi. Bunları "ejs" template motoru ile yakalamak için bir değişken şeklinde düşünebiliriz.

`<%= ----- %>`

Aşağıdaki örneğimizde page_name 'in aldığı değerin ne olduğuna göre active classı ilgili linke ekleniyor.

`
"<li class="nav-item <%= page_name ==='index' && 'active' %>"><a class="nav-link" href="/">Home</a></li>
<li class="nav-item <%= page_name ==='about' && 'active' %>"><a class="nav-link" href="/about">About Us</a></li>"

`

## Yönlendirme (Routing)

 > controller klasöründe gelen isteklere vereceğimiz cevapları barındıran fonsiyonları ekliyoruz 

 Yönlendirme Routing genel olarak belirli bir adrese, belirli bir HTTP metodu (GET, POST vs..) ile gelen isteğe ne şekilde cevap verileceğini gösterir. Aşağıdaki örneğimizde gördüğümüz gibi root\about isteğine karşılık olarak about template 'in render edilmesi belirtiliyor.


`
app.get('/about', (req, res) => {<br>
    res.status(200).render('about', {<br>
        page_name: "about"<br>
    });<br>
  });<br>
`

PCAT projemizde yönlendirmeleri app.js dosyası içerisinde yazmıştık. SmartEdu projemizde ise yönlendirmeleri ayrı bir routes klasörü içerisinde ayrı yönlendirme dosyaları oluşturacağız. Önce app.js tarafındaki ana yönlendirmelere bakalım.



app.use('/', pageRoute);  //


Yukarıda da gördüğümüz gibi, şu an için tüm gelen istekler pageRoute'a yönlendiriliyor, sadece bu yönlendirmemiz mevcut. routes/pageRoute.js dosyasına gittiğimizde ise burada iki adet yönlendirme var.



`router.route('/').get(pageController.getIndexPage);`
`router.route('/about').get(pageController.getAboutPage);`


/ yani http://localhost:3000/ adresine karşılık getIndexPage, /about yani http://localhost:3000/about adresine karşılık getAboutPage fonksiyonu çalıştırılacak. Bu fonksiyonların çalıştırılacağı controllers/pageController.js dosyasına baktığımızda ise ilgili fonksiyonların bu dosya içerisinde oluşturulduğunu göreceğiz. İlgili fonksiyonlar aşağıdadır:


`
exports.getIndexPage = (req, res) => { <br>
  res.status(200).render('index', { <br>
    page_name: 'index', <br>
  });<br>
};<br>
`
`
exports.getAboutPage = (req, res) => {<br>
  res.status(200).render('about', {<br>
    page_name: 'about',<br>
  });<br>
};<br>
`

## Kurs Modeli 

model oluturacağız bunun için mongoose indireceğiz 

1.adım `npm i mongoose`
2.adım mongoose yi require ediyoruz 
3.adım `models` klasörünü oluşturuyoruz
4.adım kurs olşturma işlemi için modeli oluşturuyoruz `Course.js` dosyasını olşturuyoruz. 
5.adım `Course.js` sayfasında mongoose yi require diyoruz 
6.adım  `Course.js` sayfasında `const Schema = mongoose.Schema;` schema yı açağırıyoruz 
7.adım  `Course.js` sayfasında yeni bir schema oluşturuyoruz. Bu şablon olşturulurken kurs ile ilgili gekelli kısımlara göre şablon oluşturuyoruz 
8.adım şablona string boolen date number obje gibi veri tiplerinde değer tanımlaması yapabilmekteyiz smartEdu projesinde ki kurs içeriği ile ilgil şablonumuz <br>
`
const courseSchema = new Schema({ <br>
    name : { <br>
        type: String,<br>
        unique : true ,// bu isimden tek bir tane olması için isim den <br>
        required : true //  zorunlu olarak doldurulması gereken alan <br>
<br>
    },<br>
    image : String,<br>
    title : String,<br>
    description : {<br>
        type: String,<br>
        required : true, //  zorunlu olarak doldurulması gereken alan <br>
        trim : true // girilen string değerin başında ve sonunda ki boşluları kaldırmak için<br>
    } ,<br>
    createDate : {<br>
        type : Date,<br>
        default : Date.now<br>
    }<br>
})<br>
`
9.adım şablonu modele çevireceğiz `const Course = mongoose.model('courses', courseSchema)`
10.adım modülü exports ediyoruz. 

Yeni bir control dosyası oluturacağız burada yeni bir kurs oluturmak için gerekli fonksiyonları yazacağız 

1.  adım controllers klasörünü içerisine courseController.js dosyasını açıyoruz
2.  adım model dosyasını require ediyouruz `const Course = require('../models/Course');`
3.  adım `createCourese` asekron fonksiyon yzıyoruz 

`
exports.createCourse = async (req, res) => { <br>
    const course = await Course.create(req.body);<br>
<br>
    try{<br>
        res.status(201).json({<br>
            status : 'başarılı',<br>
            course<br>
        })<br>
    } catch{<br>
        res.status(400).json({<br>
            status : 'fail',<br>
            error,<br>
        });<br>
    };<br>
};<br>
`

> kurs oluşturma sayfamız hazır olmadığı için bir sümilasyon yapıyoruz .json() ile 
> res.status(201) yeni bir eleman oluşturuken kullanılan statü kodudur 
> res.status(400) bad requrest hatası 
> try catch ile hatayı karşılamak için yazıyoruz 


route oluşturma 

1.  adım `routers` klasötürün içerisine coureseRoute.js dosyası oluşturulur. 
2. adım `const express = require('express');` ve `const coursController = require('../controllers/coursController')` require edilir 
3. adım `const router = express.Router();` router çağrılır
4.  adım `router.route('/').post(coursController.createCourse);` dikkat post req ediyoruz form üzerinden gelen verileri yakalayabilmek için
5.  adım `module.exports = router;` modlülü exports ediyoruz 

app.js e 

`app.use('/courses', courseRoute )` courses e istek geldikten sonra yukarıya doğru işlemleri yapacak



 


*********************************************************************************

Kaynak : patika.dev nodejs dersi 

[NODEJS PATİKASI](https://app.patika.dev/paths/nodejs-ile-backend-patikasi)