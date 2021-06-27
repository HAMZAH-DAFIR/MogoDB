const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dafir')
        .then(() => console.log('DataBase Connecting'))
        .catch(err => console.error(err));
        
const courseSchema = mongoose.Schema({
    name : String,
    author : String,
    tagd : [String],
    date : {type : Date , default : Date.now},
    isPublished : Boolean
});

const Course = mongoose.model('Course',courseSchema);
//operators comparison
    // $eq => equal
    // $neq => not equal
    // $gt => greater then 
    // $gte => greater then or equal
    // $lt => less then 
    // $lte => less then or equal
    // $in  => in
    // $nin => not in
// operators logic 
    // and
    // or

async function getCourses () {
    const courses = await Course.find({isPublished : false})
                                // .and([{isPublished : false},{isPublished : true}])
                                .or([{isPublished : false},{isPublished : true}])
                                .select({name : 1, date : 1, isPublished : 1 , _id: 0 })
                                .sort({name : -1})
    console.log(courses) ;                           
}
getCourses ()

// async function courses(){
//     const course = new Course({
//         name : 'Node Js',
//         author : 'Dafir hamzah',
//         tagd : ['Node Js', 'Javascript','Backend'],
//         isPublished : true
//     })
//   const result =  await course.save();
//   console.log(result);
// }
// courses();