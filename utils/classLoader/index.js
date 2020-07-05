class ClassLoader{

 load(target,loaded){
   for(var prop of Object.getOwnPropertyNames(loaded)){
     if(!target.prototype[prop]){
       target.prototype[prop] = loaded[prop]
     }
   }

   for(var prop of Object.getOwnPropertyNames(loaded.constructor.prototype)){
     if(!target.prototype[prop]){
       target.prototype[prop] = loaded.constructor.prototype[prop]
     }
   }
 }

}

export default ClassLoader
