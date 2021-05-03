module.exports = (app,dbConnection,mybatisMapper) => {
    //mapper 가져오는 경로의 root는 프로젝트 root와 같다.
    mybatisMapper.createMapper(['./react-practice-backend/mapper/todoListMapper.xml']);

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
}