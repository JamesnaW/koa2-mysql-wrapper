
const mysql = require('mysql2/promise');
let optimize = require('./prefix');

let mysqlPool = function(conn) {
  let pool = mysql.createPool(conn);
  return {
    client: pool,
    pool: pool
  };
};

let execute = async function(query, args, db, options){
  try{
    if(typeof args === 'object'){
      args = args.map(q=>{
        if(typeof q === 'boolean')
          q=Number(q)

        return q
      })
    }
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
    let query = []
    if(typeof args === 'object'){
      query = arr.map(q=>{
        return db.client.execute(q[0], q[1])
      })
    }
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
    try{
      ctx[options ? options.method || 'myPool' : 'myPool'] = ()=>{
        return {
          query: function(query,args,options){
            let {newQuery, newArgs} = optimize(query, args)
            return execute(newQuery, newArgs, db, options);
          },
          async: function(...arr){
            return executeAsync(db, ...arr);
          }
        }
      }
    }catch(err){
      return err;
    }

    await next();
    db.pool.end();
  }
}
