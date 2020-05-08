const Joi = require('joi');
const express =   require('express');
const app = new express();

const courses = [{id:1, name :'courses1'},{id:2,name:"course2"}]
app.get('/',(req,res)=>{
res.send("Hello Arun");
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
    });

app.get('/api/courses/:year/:month',(req,res)=>{
    res.send(req.params);
    });

app.get('/api/courses/:id',(req,res)=>{
    res.send(courses.find(c=>c.id===parseInt( req.params.id)));
    });

app.post('/api/courses',(req,res)=>{
    //JOI  validations
    const schema= {name:Joi.string().min(3).required()}
    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error);
    }

    //normal validations
    if(!req.body.name)
    {
        res.status(400).send("400 bad request");
    }
    const course = {
        id:courses.length+1,
        name :  req.body.name
    }
    courses.push(course);
    res.send(courses);
})

    const port= process.env.PORT  || 3000

    console.log(process.env);
app.listen(port,()=>console.log(`am on at ${port}`));