const express = require('express');
const app = express();

//DB connection info
const serverInfo = require('./mapper/serverInfo');

//mybatis-mapepr 추가
const mybatisMapper = require('mybatis-mapper');

//request body의 json 객체 형태로 접근을 위해 선언.
app.use(express.json());

//비즈니스 로직 임포트
const todoList = require('./service/todoList');

//db connection 생성.
const mariadb = require('mariadb');
const dbConnection = mariadb.createConnection(serverInfo);

//비즈니스 로직 탈 부분 분리
todoList(app,dbConnection,mybatisMapper);

app.listen('8080',()=>{
    console.log('express for nodejs is runnning..');
});

