const nodemailer = require("nodemailer");
const Course = require('../models/Course');
const User = require('../models/User');


exports.getIndexPage = async (req, res) => {
  console.log(req.session.userID);

  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role:'student'});
  const totalTeachers  = await User.countDocuments({role:'teacher'});


  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getcontactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req,res) => {
  try{
    const outputMessage = `
      <h1> Mesaj Detayları </h1>
        <ul>
          <li> First Name : ${req.body.first_name} </li>
          <li> Last Name : ${req.body.last_name}</li>
          <li> Email : ${req.body.email}</li>
          <li> Phone : ${req.body.phone}</li>
        </ul>
        <h2> Message</h2>
          <p>${req.body.message} </p>
    `

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "muharremozer505@gmail.com", // gmail acount
        pass: "**************", // gmail  password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart Edu 👻" <muharremozer505@gmail.com>', // sender address
      to: "muharrem.o@outlook.com", // list of receivers
      subject: "Hello New Message ✔", // Subject line
      html: outputMessage, // html body
    });

  req.flash("basarili","Mesajınızı başarıyla aldık");
  res.status(200).redirect('contact');
} catch(err){
  req.flash("err","Mesajınız alınamadı!");
  res.status(200).redirect('contact');
}
}
