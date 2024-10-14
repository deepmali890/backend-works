const http = require('http');
const object = require('./support');

// console.log(http)


http.createServer((req, res)=>{
    // res.end("hello world")

    //   console.log(req.method);
    // console.log(req.url);


      if(req.url==='/test'){
        res.end("hello testing page")
    }
    // if(req.url==='/login'){
    //     res.end('hello login page')
    // }

    if(req.url==='/login' && req.method==='GET'){
               res.end("hello login page") 
           }

           if(req.url==='/login' && req.method==='PUT'){
                   res.end(JSON.stringify(object));
               }
}).listen(1200);




  

//   
//    
//   
// }).listen(4200);


// console.log(http)