#Koa2-mysql-wrapper

Koa2 middleware for wrap Mysql2

This middleware is just wrap Mysql2 project into koa context

# Install Koa2-mysql-wrapper
```
npm install --save koa2-mysql-wrapper
```

#mysql(connectionString, [options])
* `connectionString`: Mysql2 connection string, e.g. `{host:'localhost', user: 'root', password: 'test', database: 'test'}`
* `options`: **Object**, You can overwrite method to call this wrapper method, default you will call like `ctx.myPool.query`, overwrite by pass `{ method: 'mysql' }`, so you can call `ctx.mysql.query()`

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

###Supported
* `Array values`: ctx.myPool.query('SELECT * FROM `table` WHERE `name` in (?) AND `dead` = ?', [['James', 'Collyer'], 0]), notice that its support only 1 nested array.
* `Boolean values: Convert `True and False` to `1 and 0`, e.g. ctx.myPool.query('SELECT * FROM `table` WHERE `name` in (?) AND `dead` = ?', [['James', 'Collyer'], false]).



Thanks to supported me, If you find any issue or need any special modules please report me to improve and maintenance for better module.

## License

MIT
