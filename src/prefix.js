module.exports = function optimize (query, args) {
    if(typeof query !== 'string')
      throw new Error('query must be string')

    if(!args || args.length === 0)
    return {newQuery: query, newArgs: args}

    let argL = args.length
    let prefixL = ((query||'').match(/\?/g)||[]).length
    if(argL != prefixL)
    return {newQuery: query, newArgs: args}

    let prefix = []
    args.map((q, i)=>{
      if(typeof q === 'object' && q.length > 0){
        let p = []
        q.map(()=>{
          p.push('?')
        })
        prefix.push(p.join(','))
      }else{
        prefix.push('?')
      }
    })
    let split = query.split('?')
    let newQuery = ''
    split.map((q, i)=>{
      newQuery += q + (prefix[i]||'')
    })
    let newArgs = args.reduce(function(a, b) {
      if(typeof a !== 'object')
        a = [a]
      if(typeof b !== 'object')
        b = [b]

      return a.concat(b);
    });
    if(typeof newArgs !== 'object')
      newArgs = [newArgs]

    return {newQuery: newQuery, newArgs: newArgs}
}
