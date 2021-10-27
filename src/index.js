const { Console } = require('console');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

/**
* INICIALIZACIONES
*/
var arrayNumbers = randomArrayWithIntValues()
var arrayExercice =  randomArrayWithIntValues()
var arrayModified = [...arrayExercice];
ejercicio3(12);

/**
* devuelve el array desordenado de numeros para mostrar los cambios realizados
*/
app.locals.showArrayNumbers = () => {
  return arrayNumbers;
};

/**
* devuelve el array desordenado de numeros de el ejercicio 3 para mostrar los cambios realizados
*/
app.locals.showArrayNumbersExercice3 = () => {
  return arrayExercice;
};
/**
* devuelve el array ordenado de numeros para mostrar los cambios realizados en el ejercicio 3
*/
app.locals.showArrayModified= () => {
  return arrayModified;
};

/**
* llena un array de numeros aleatorios
*/
function  randomArrayWithIntValues() {
  const COUNT = 12;
  let randArray = [];
  for (let a = 0; a < COUNT; a++) {
      const sign = Math.random() < 0.25 ? -1 : 1;
      randArray.push(Math.floor(Math.random() * 100) * sign);
  }
  return randArray;
}

/**
* Dado un array de números devuelve el máximo.
* `undefined` si el array es vacío
*
* @param {number[]=} arr
* @returns el máximo o `undefined`
*/
app.locals.ejercicio1 = () => {
  if(arrayNumbers.length > 0) var maxNumber = arrayNumbers[0]
  else var maxNumber = undefined

  for(i=1; i<arrayNumbers.length; i++){
    if(arrayNumbers[i] > maxNumber) maxNumber = arrayNumbers[i]
  }
  return maxNumber
}

/**
 * Deja el mayor elemento en la última posición
 *
 * @param {number[]=} arr
 * @returns
 */
 app.locals.ejercicio2 = (arraySize) => {
  
  if(arraySize == undefined) var newSize = 12
  else var newSize = arraySize

  if(newSize > 0) var maxNumber = { number: arrayNumbers[0], position: 0 }
  else var maxNumber = undefined

  for(i=1; i<newSize; i++){
    if(arrayNumbers[i] > maxNumber.number){
      maxNumber.position = i
      maxNumber.number = arrayNumbers[i]
    } 
  }

  const newArrayNumbers = [...arrayNumbers];
  newArrayNumbers[maxNumber.position] = arrayNumbers[newSize - 1]
  newArrayNumbers[newSize - 1] = maxNumber.number

  return newArrayNumbers
}
/**
* Ejercicio 3, __versión recursiva__.
* _Sin bucles_
*
* @param {*} len undefined en llamada inicial
*/
function ejercicio3(arraySize) {
  if(arraySize == undefined) var newSize = 12
  else var newSize = arraySize
  if(newSize > 0) var maxNumber = { number: arrayModified[0], position: 0 }


  for(i=1; i<newSize; i++){
    if(arrayModified[i] > maxNumber.number){
      maxNumber.position = i
      maxNumber.number = arrayModified[i]
    } 
  }

  arrayModified[maxNumber.position] = arrayModified[newSize - 1]
  arrayModified[newSize - 1] = maxNumber.number
  
  if(newSize > 1){
    ejercicio3(newSize - 1)
  }
}

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev')); 

// routes
app.use(require('./routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// listening the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
