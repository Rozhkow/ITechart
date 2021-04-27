"use strict";
                     
mistypeVaraible = 17; // Предполагая, что не существует глобальной переменной mistypedVaraible, эта строка выбросит ReferenceError из-за опечатки в имени переменной 


// Присваивание значения глобальной переменной, защищённой от записи
var undefined = 5; // выдаст TypeError
var Infinity = 5; // выдаст TypeError


// Присваивание значения свойству, защищённому от записи
var obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // выдаст TypeError


// Присваивание значения свойству, доступному только для чтения
var obj2 = { get x() { return 17; } };
obj2.x = 5; // выдаст TypeError


// Задание нового свойства нерасширяемому объекту
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // выдаст TypeError


delete Object.prototype; // попытки удалить неудаляемые свойства будут вызывать исключения (TypeError)


var o = { p: 1, p: 2 }; // синтаксическая ошибка (Свойство должно встречаться только единожды)


var a = 0o10; // запрещает синтаксис восьмеричной системы счисления


// ECMAScript 2015 запрещает установку свойств primitive значениям
(function() { 
    'use strict';
    
    false.true = '';         // TypeError
    (14).sailing = 'home';   // TypeError
    'with'.you = 'far away'; // TypeError
    
})();


// use strict запрещает использование with (любое имя внутри блока может ссылаться как на свойство обрабатываемого объекта)
// Альтернатива with - присваивание объекта переменной с коротким именем и затем доступ к нужному свойству как свойству этой переменной.
var x = 17;
with (obj) { 
    x;
}    


// use strict запрещает удаление простых имён
var x;
delete x; // синтаксическая ошибка
eval('var y; delete y;'); // синтаксическая ошибка


// Ключевые слова eval и arguments не могут быть переопределены или изменены. 
// Все подобные попытки это сделать являются синтаксическими ошибками
eval = 17;
arguments++;
++eval;
var obj = { set p(arguments) { } };
var eval;
try { } catch (arguments) { }
function x(eval) { }
function arguments() { }
var y = function eval() { };
var f = new Function("arguments", "'use strict'; return 17;");


// В use strict поля объекта arguments не связаны с проименованными аргументами функции, а являются их продублированными копиями значений
function f(a) {
    "use strict";
    a = 42;
    return [a, arguments[0]];
  }
  var pair = f(17);
  console.assert(pair[0] === 42);
  console.assert(pair[1] === 17);

// В свойство arguments.callee больше не поддерживается
var f = function() { return arguments.callee; };
f(); // выдаст TypeError


// Для функции в use strict точно определённый this не упаковывается в объект, а если не определён точно, this является undefined
// Для точного определения конкретного this используйте call, apply, или bind
"use strict";
function fun() { return this; }
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);


// Если fun находится в use strict, то fun.caller, так же как и fun.arguments, 
// представляют собой неудаляемые свойства, которые приведут к вызову исключения при попытке их чтения или записи
function restricted() {
    "use strict";
  
    restricted.caller;    // выдаст TypeError
    restricted.arguments; // выдаст TypeError
}
function privilegedInvoker() {
    return restricted();
}
privilegedInvoker();


// В use strict зарезервирован для использования следующий список ключевых слов: 
// implements, interface, let, package, private, protected, public, static и yield.
function package(protected) { // синтаксическая ошибка
    "use strict";
    var implements; // синтаксическая ошибка
  
    interface: // синтаксическая ошибка
    while (true) {
      break interface; // синтаксическая ошибка
    }
  
    function private() { } // синтаксическая ошибка
}
function fun(static) { 'use strict'; } 
  

//  В use strict запрещается объявление функций глубже самого верхнего уровня скрипта или функции
 "use strict";
if (true) {
  function f() { } // синтаксическая ошибка
  f();
}
for (var i = 0; i < 5; i++) {
  function f2() { } // синтаксическая ошибка
  f2();
}
function baz() { // верно
  function eit() { } // тоже верно
}