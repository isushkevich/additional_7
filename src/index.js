module.exports = function solveSudoku( matrix ) {

  const emptyCells = [];

  for ( let i = 0; i < 9; ++i ) {
    for ( let j = 0; j < 9; ++j ) {
      if ( matrix[ i ][ j ] == 0 ) {
        emptyCells.push( [ i, j ] );
      }
    }
  }

  let row, column, candidate, found, emptyCount = emptyCells.length,
    i = 0;

  while ( i < emptyCount ) {
    row = emptyCells[ i ][ 0 ];
    column = emptyCells[ i ][ 1 ];
    candidate = matrix[ row ][ column ] + 1;
    found = false;

    while ( !found && candidate <= 9 ) {
      if ( checkSudoku( matrix, row, column, candidate ) ) {
        found = true;
        matrix[ row ][ column ] = candidate;
        i++;
      } else {
        candidate++;
      }
    }

    if ( !found ) {
      matrix[ row ][ column ] = 0;
      i--;
    }
  }

  return matrix;
}


function checkSudoku( matrix, row, column, candidate ) {

  for ( let i = 0; i < 9; ++i ) {
    if ( matrix[ row ][ i ] == candidate ) {
      return false;
    }
  }
  for ( let i = 0; i < 9; ++i ) {
    if ( matrix[ i ][ column ] == candidate ) {
      return false;
    }
  }

  const rowBegin = Math.floor( row / 3 ) * 3;
  const rowEnd = rowBegin + 3;
  const columnBegin = Math.floor( column / 3 ) * 3;
  const columnEnd = columnBegin + 3;

  for ( let i = rowBegin; i < rowEnd; ++i ) {
    for ( let j = columnBegin; j < columnEnd; ++j ) {
      if ( matrix[ i ][ j ] == candidate ) {
        return false;
      }
    }
  }

  return true;
}