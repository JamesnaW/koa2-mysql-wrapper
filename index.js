
const mysql = require('mysql2/promise');

 let mysqlPool = function(conn) {
  let pool = mysql.createPool(conn);
  return {
    client: pool,
    pool: pool
  };
};

let execute = async function(query, args, db, options){
  try{
    let [rows, fields] = await db.client.execute(query, args);
    if(options && options.fields)
      return [rows, fields];

    return rows;
  }catch(err){
    return err;
  }
}
let executeAsync = async function(db, ...arr){
  try{
    let query = arr.map(q=>{
      return db.client.execute(q[0], q[1])
    })
    let [...rows] = await Promise.all(query);
    let ret = []
    for(let i=0;i<rows.length;i++){
      ret.push(rows[i][0])
    }
    return ret
  }catch(err){
    return err;
  }
}

module.exports = function(conn, options){
  return async function(ctx, next) {
    let db = mysqlPool(conn);
    ctx[options ? options.method || 'myPool' : 'myPool'] = ()=>{
      return {
        query: function(query,args,options){
          return execute(query, args, db, options);
        },
        async: function(...arr){
          return executeAsync(db, ...arr);
        }
      }
    }
    await next();
    db.pool.end();
  }
}
