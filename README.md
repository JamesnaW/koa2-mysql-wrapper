# Koa2-mysql-wrapper

Koa2 middleware that wraps Mysql2

This middleware just wraps Mysql2 project into the Koa context

Koa2-mysql-wrapper requires Node v7.6.0 or higher for ES2015 and async function support.

# Install Koa2-mysql-wrapper
```sh
npm install --save koa2-mysql-wrapper
```
# Install Koa2-mysql-wrapper - v7.6.0 and under
```sh
npm install --save koa2-mysql-wrapper@1
```

## `mysql(connectionString, [options])`
* `connectionString`: Mysql2 connection string, e.g. `{host:'localhost', user: 'root', password: 'test', database: 'test'}`
* `options`: **Object**, You can overwrite the method used to call this wrapper. By default your call is: `ctx.myPool().query`, you can overwrite this by passing an option: `{ method: 'mysql' }`. That way, you can call `ctx.mysql.query()`.

## `query(queryString, argument, options)`
* `queryString`: `select * from user`.
* `argument`: Default: [], `replace value on ? prefix, select * from user where active=?`, [true]
* `options`: **Object**, if you need column name then you can pass option: `{ field: true }`. Default: `{ field: false }`

# Usage
```js
import Koa from 'koa'
import mysql from 'koa2-mysql-wrapper'

const app = new Koa()

app.use(mysql({host:'localhost', user: 'root', password: 'test', database: 'test'}))

app.use(async (ctx, next) => {
  let query = await ctx.myPool().query('SELECT * FROM `table` WHERE `name` = ? AND `dead` = ?', ['James', 0])
  await next()
})
```

## Supported
* `Array values`: `ctx.myPool().query('SELECT * FROM 'table' WHERE 'name' in (?) AND 'dead' = ?', [['James', 'Collyer'], 0])`, notice that it supports only 1 nested array.



Thanks for supporting me. If you find any issue or need any special modules, please report to me so I can improve and maintain for a better module.

# License

MIT
