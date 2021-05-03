module.exports = (app,dbConnection,mybatisMapper) => {
    //mapper 가져오는 경로의 root는 프로젝트 root와 같다.
    mybatisMapper.createMapper(['./react-practice-backend/mapper/todoListMapper.xml']);

    const sqlFormat = {language : 'sql', indent : '  ', uppercase : true};
    app.post('/todoList/init',(req,res)=>{
        dbConnection.then(conn=>{
            conn.query(mybatisMapper.getStatement('todoListMapper', 'selectTodoList')).then(rows=>{
                let result = {};
                try {
                    result.status = 'success';
                    result.data = JSON.stringify([...rows]);
                    res.send(result);
                }catch (e) {
                    result.status = 'failed';
                    result.message = e.toString();
                    res.send(result);
                }
            })
        })
    });

    app.post('/todoList/insert',(req,res)=>{
        const reqData = {...req.body};
        const mapper = mybatisMapper.getStatement('todoListMapper','insertTodoList',reqData, sqlFormat);

        //getStatement 때 포맷(4번째 파라미터) 지정 시 로그에 포맷이 지정되어 찍힘.
        console.log('query :: ',mapper);

        dbConnection.then(conn=>{
            let result = {};
            try{
                conn.query(mapper);
                result.status = 'success';
                res.send(result);
            }catch (e){
                result.status = 'failed';
                result.message = e.toString();
                res.send(result);
            }
        })
    })

    app.post('/todoList/update',(req,res)=>{
        const reqData = {...req.body};
        const mapper = mybatisMapper.getStatement('todoListMapper','updateTodoList',reqData, sqlFormat);
        console.log('query :: ',mapper);

        dbConnection.then(conn=>{
            let result = {};
            try{
                conn.query(mapper);
                result.status = 'success';
                res.send(result);
            }catch (e){
                result.status = 'failed';
                result.message = e.toString();
                res.send(result);
            }
        });
    });

    app.post('/todoList/delete',(req,res)=>{
        const reqData = {...req.body};
        const mapper = mybatisMapper.getStatement('todoListMapper','deleteTodoList',reqData, sqlFormat);
        console.log('query :: ',mapper);

        dbConnection.then(conn=>{
            let result = {};
            try{
                conn.query(mapper);
                result.status = 'success';
                res.send(result);
            }catch (e){
                result.status = 'failed';
                result.message = e.toString();
                res.send(result);
            }
        });
    });
}