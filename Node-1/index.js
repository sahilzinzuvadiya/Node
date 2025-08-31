const http=require("http")
const fs=require("fs")
const port=1090

const porthandler=(req,res)=>{
    let filename=''
    switch(req.url){
        case'/':
            filename='./inde.html'
            break;
        default:
            filename='./error.html'
            break;
    }
    
    fs.readFile(filename,(err,result)=>{
        if(!err){
            res.end(result)
        }
    })
}

const server=http.createServer(porthandler)

server.listen(port,(err)=>{
    if(err){
        console.log("server not found");
        
    }
    else{
        console.log("server strted on port " + port);
        
    }
})