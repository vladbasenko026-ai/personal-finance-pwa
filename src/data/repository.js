export function createRepository(storage,key='finance.transactions.v4'){
 return {list(){return JSON.parse(storage.getItem(key)||'[]');},save(item){storage.setItem(key,JSON.stringify([item,...this.list()]));return item;}};
}