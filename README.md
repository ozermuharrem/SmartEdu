 smart edu projesi nodejs öğrenirken yaptımız çalışmaları içermektedir

 ## http status code 

 HTTP yanıt durumu kodları bizlere o anda yapılmak istenen işleme özel bir durum bilgisi gönderilir (OK, Bad Request vs..). Bu gönderilen her durumun kendine özel bir sayı ifadesi vardır (200, 201, 404 vs..)

### Neden Durum Kodları?


Örneğin biz yeni bir post ekleyeceğiz ancak frontend sayfamız hazır değil! Durum kodları sayesinde biz backend tarafında yaptığımız işlemin başarılı olup olmadığını kontrol edebiliriz.



 > sunucu ile istemci arasında temel iletişimi tcpid sağlıyor.
 > http ise sunucu ile istemci arasında ki konuşma yöntemleridir. 
 > http status code ise o anki yapılan işlem hk. bilgi verir

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

Projemizde linklerin ilgili sayfaya göre aktif olmasını istiyoruz. Bunun için ilgili template dosyasın o bilgiyi page_name olarak gönderiyoruz. İlgili `page_name`'e ait olan değer her sayfaya göre değişiyor. Örneğin index sayfası için:

`
app.get('/', (req, res) => {
  res.status(200).render('index', {
      page_name: "index"
  });
});
`
about sayfası için:

`
app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
}); 
`

"page_name" ilgili template dosyasına gönderildi. Bunları "ejs" template motoru ile yakalamak için bir değişken şeklinde düşünebiliriz.

`<%= ----- %>`

Aşağıdaki örneğimizde page_name 'in aldığı değerin ne olduğuna göre active classı ilgili linke ekleniyor.

`
<li class="nav-item <%= page_name ==='index' && 'active' %>"><a class="nav-link" href="/">Home</a></li>
<li class="nav-item <%= page_name ==='about' && 'active' %>"><a class="nav-link" href="/about">About Us</a></li>

`






*********************************************************************************

Kaynak : patika.dev nodejs dersi 

[NODEJS OATİKASI]{https://app.patika.dev/paths/nodejs-ile-backend-patikasi}