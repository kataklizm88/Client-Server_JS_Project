// Первое задание

/* Области видимости:
       1)глобальная
	   2) внутри функции
       3) блочная (внутри блока)
       4) в блоке catch
       5) код, выполняемый в eval
*/


// Второе задание



const elem = (i)=> new Promise((reslove)=>{
    reslove(i)
}).then((data)=>{
console.log(data);
})

for (var i = 0; i <= 10; i++) {
  elem(i)
}



// Третье задание

var firstName = "Elena"
const obj = {
   firstName: 'John',
   sayFirstName: function () {
      console.log(this.firstName)
   }
}
obj.sayFirstName();


// Четвертое задание


// Первый способ

const user = {
   age: 20
}
function getArrowFunction() {
   "use strict"
   return () => {
      console.log(this)
   }
}

const fu = getArrowFunction.apply(user)
fu()


// Второй способ

const user1 = {
   age: 20
}
function getArrowFunction() {
   "use strict"
   return () => {
      console.log(this.age)
   }
}

const obj1= {
  age:user.age,
  getArrowFunction
}

function func(callback){
  callback(user1)
}

let x = obj1.getArrowFunction()
func(x)
 