export function addTransaction(repo,input,makeId=()=>crypto.randomUUID()){
 const amount=Number(input.amount), category=String(input.category??'').trim(), date=String(input.date??'');
 if(!['income','expense'].includes(input.type)) throw Error('Оберіть тип.');
 if(!Number.isFinite(amount)||amount <= 0||amount>1e9||Math.abs(amount*100-Math.round(amount*100))>0.00001) throw Error('Сума має бути більшою за 0 (до двох десяткових знаків).');
 if(!category||category.length>80) throw Error('Вкажіть категорію.');
 const d=new Date(date+'T00:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==date) throw Error('Вкажіть коректну дату.');
 return repo.save({id:makeId(),amountCents:Math.round(amount*100),type:input.type,date,category});
}
export function balanceCents(items){return items.reduce((sum,t)=>sum+(t.type==='income'?t.amountCents:-t.amountCents),0);}
