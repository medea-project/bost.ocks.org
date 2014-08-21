/*
  Run the given function and return the result

  This function is useful to create a private scope for the declaration
  of a module:
  var module = privately(function() {
    // private scope
    ...
  });
  as a replacement to the complex Immediately Invoked Function Expression [1]:
  var module = (function(){
    // private scope
    ...
  }());
  or confusing alternatives such as:
  var module = !function() {
    // private scope
    ...
  };
  or even:
  var module = new function() {
    // private scope
    ...
  };

  Parameter:
    func - function(), the function to run, called without arguments

  Returns:
    any, the result of the function called

  Reference:
  [1] Immediately-Invoked Function Expression (IIFE)
  2010-11-15, by Ben Alman
  http://benalman.com
    /news/2010/11/immediately-invoked-function-expression/
*/
function privately( func ) {
  return func();
}

/*
  Run given function for each item in given array,
  including items with null and undefined values

  Parameters:
    array - array, the array to iterate
    callback - function( item, offset ), the callback called at each offset,
               with the item value and current offset provided as arguments.
               If the callback returns true, the iteration is interrupted and
               following items will not be processed.

  Returns:
    boolean, true when the iteration has been interrupted by a callback,
    false otherwise

  Notes:
  * items are processed in ascending order of offset, from 0 to the initial
  length of the array at the time of the call to forEach()
  * in case items are deleted, updated or inserted, the current value of each
  item at the current offset at the time of the call to the callback will be
  provided to the callback
*/
function forEach( array, callback ) {
  var
    isBreak = false,
    i,
    length = array.length;

  for ( i = 0; i < length && !isBreak ; i++ ){
    isBreak = callback( array[ i ], i ) === true;
  }

  return isBreak;
}

/*
  Run given function for each property of given object matching the filter,
  skipping inherited properties

  Parameters:
    object - object, the object to iterate
    callback - function( value, name ): boolean, the callback called for each
               property owned by the object (not inherited), with property
               value and name provided as arguments.

  Notes:
    * properties are iterated in no particular order
    * whether properties deleted or added during the iteration are iterated
      or not is unspecified
*/
function forEachProperty( object, callback ) {
  var
    name,
    value;

  for ( name in object ) {
    if ( hasOwnProperty( object, name ) ) {
      value = object[name];
      callback( value, name );
    }
  }
}
