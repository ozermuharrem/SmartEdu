const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    const course = await Course.create(req.body);

    try{
        res.status(201).json({
            status : 'başarılı',
            course
        })
    } catch{
        res.status(400).json({
            status : 'fail',
            error,
        });
    };
};

//module.exports = createCourse;