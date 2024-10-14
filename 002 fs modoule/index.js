const fs = require('fs');
const path = require('path');   


const filepath = path.join(__dirname, 'files')   // console.log(filepath) file path is ready



// console.log(fs)

// console.log(__dirname)  return root dirname.....

// console.log(__filename)  return to file name......





//// how o Create a file ......

fs.writeFileSync(`${filepath}/index.css`, '<h1>Hello Everybody</h1>'); 
 /// file is ready is file folder isse hum kahi bhi file bana skte hai  

 


 ///how to read  files

 fs.readFile(`${filepath}/index.txt`,'utf-8', (error, data)=>{  /// read file and ye 3 perameeter leta hai first file path and second text unquie code "(utf-8)",  third callback function ( error ,data) kuch is tarah ka segment hai
    if(error) return console.log(error);

    console.log(data)
 })


 //// append file


 fs.appendFile(`${filepath}/index.txt`, ' and update file just now', ()=>{
    console.log('file updated')  //// file ke andar kuch bhi append kar skte hai ye sath hi ye bhi 3 perameeter leta hai
 })

 
 /// delete file

 fs.unlinkSync(`${filepath}/index.css`);  //// ab  ye file delete ho chuki hai







