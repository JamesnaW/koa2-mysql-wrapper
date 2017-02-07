#Koa2-mysql

Koa2 middleware for wrap Mysql2

This middleware is just wrap Mysql2 project into koa context

# Install Koa2-mysql-wrapper
```
npm install --save koa2-mysql-wrapper
```

#mysql(connectionString, [options])
* `connectionString`: Mysql2 connection string, eg. `{host:'localhost', user: 'root', password: 'test', database: 'test'}`
* `options`: **Object**, You can overwrite method to call this wrapper method, default you will call like `ctx.myPool.query`, overwrite by pass { method: 'mysql' }, so you can call `ctx.mysql.query()`

##Usage
```
import Koa from 'koa'
import mysql from 'koa2-mysql-wrapper'

const app = new Koa()

app.use(mysql({host:'localhost', user: 'root', password: 'test', database: 'test'}))

app.use(async (ctx, next) => {
  let query = await ctx.myPool.query('SELECT * FROM `table` WHERE `name` = ? AND `dead` = ?', ['James', 0])
  await next()
})
```


## License

MIT
