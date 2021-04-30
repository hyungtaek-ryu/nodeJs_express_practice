//http 모듈 생성.
const http = require('http');
const querystring =  require('querystring');

//요청된 url 정보 생성.
const url = require('url');

//mariadb dbconnection 생성.
const mariadb = require('mariadb');
const dbConnection = mariadb.createConnection({
    host : 'localhost',
    port : '3306',
    database : 'react_practice',
    user : 'hyungtaek',
    password : 'gudxor10!'
})

const app =  http.createServer( function (request,response){
    let requestMapping = request.url;
    console.log('request mapping',requestMapping);

    //request body(data) 가 없을 경우
    if(requestMapping==='/todoList/init'){
         initTodoList(response);
    }

    //request body(data) 가 있을 경우
    request.on('data',function(data){
        const formData = JSON.parse(data);
        if(requestMapping==='/todoList/insert'){
            insertTodo(response,formData);
        }else if(requestMapping==='/todoList/update'){
            updateTodo(response,formData);
        }else if(requestMapping==='/todoList/delete'){
            deleteTodo(response,formData);
        }else{
            let result = {};
            result.status = 'failed';
            result.message = 'Do not make any calls'
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(result));
        }
    });
});

const initTodoList =  (response) => {
     dbConnection.then(conn=>{
        conn.query('select * from todoList').then(rows=>{
            let result = {};
            try {
                result.status = 'success';
                result.data = JSON.stringify([...rows]);
                response.writeHead(200,{'Content-Type':'application/json'});
                response.end(JSON.stringify(result));
            }catch (e) {
                result.status = 'failed';
                result.message = e.toString();
                response.writeHead(200,{'Content-Type':'application/json'});
                response.end(JSON.stringify(result));
            }
        })
    });
}

const insertTodo = (response,data) => {
    const {id,color,text,checked} = data;
    dbConnection.then(conn=>{
        let result = {};
        try {
            conn.query(`insert into todoList values ("${color}", "${id}","${text}",${checked})`)
            result.status = 'success';
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(result));
        }catch (e){
            result.status = 'failed';
            result.message = e.toString();
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(result));
        }
    })
}

const updateTodo = (response,data) => {
    const {checked,id} = data;
    dbConnection.then(conn=>{
        let result = {};
        try {
            conn.query(`update todoList set checked = ${checked} where id = "${id}"`)
            result.status = 'success';
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(result));
        }catch (e){
            result.status = 'failed';
            result.message = e.toString();
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(result));
        }
    })
}

const deleteTodo = (response,data) => {
    const {id} = data;
    dbConnection.then(conn=>{
        let result = {};
        try {
            conn.query(`delete from todoList where id = "${id}"`)
            result.status = 'success';
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(result));
        }catch (e) {
            result.status = 'failed';
            result.message = e.toString();
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(result));
        }
    })
}

app.listen(8080,function(){
    console.log('Server is running...');
});