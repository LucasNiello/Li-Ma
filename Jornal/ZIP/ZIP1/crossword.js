document.addEventListener('DOMContentLoaded', () => {
  const crosswordContainer = document.getElementById('crossword-container');
  const acrossCluesContainer = document.getElementById('across-clues');
  const downCluesContainer = document.getElementById('down-clues');

  const gridSize = 15; // Tamanho da grade para a cruzadinha
  let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  let wordsPlaced = [];

  // Função para verificar se uma palavra pode ser colocada na grade
  function canPlaceWord(word, row, col, direction) {
    const len = word.length;

    if (direction === 'across') {
      if (col + len > gridSize) return false;
      for (let i = 0; i < len; i++) {
        if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false;
      }
      // Check boundaries and surrounding cells
      if (col > 0 && grid[row][col - 1] !== '') return false; // Left boundary
      if (col + len < gridSize && grid[row][col + len] !== '') return false; // Right boundary
      for (let i = 0; i < len; i++) {
        if (row > 0 && grid[row - 1][col + i] !== '') return false; // Top boundary
        if (row < gridSize - 1 && grid[row + 1][col + i] !== '') return false; // Bottom boundary
      }
    } else { // down
      if (row + len > gridSize) return false;
      for (let i = 0; i < len; i++) {
        if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false;
      }
      // Check boundaries and surrounding cells
      if (row > 0 && grid[row - 1][col] !== '') return false; // Top boundary
      if (row + len < gridSize && grid[row + len][col] !== '') return false; // Bottom boundary
      for (let i = 0; i < len; i++) {
        if (col > 0 && grid[row + i][col - 1] !== '') return false; // Left boundary
        if (col < gridSize - 1 && grid[row + i][col + 1] !== '') return false; // Right boundary
      }
    }
    return true;
  }

  // Função para colocar a palavra na grade
  function placeWord(word, row, col, direction) {
    const len = word.length;
    let placedCells = [];
    if (direction === 'across') {
      for (let i = 0; i < len; i++) {
        grid[row][col + i] = word[i];
        placedCells.push({row: row, col: col + i});
      }
    } else { // down
      for (let i = 0; i < len; i++) {
        grid[row + i][col] = word[i];
        placedCells.push({row: row + i, col: col});
      }
    }
    return placedCells;
  }

  // Tentar posicionar as palavras
  crosswordData.words.sort((a, b) => b.word.length - a.word.length); // Tentar palavras mais longas primeiro

  crosswordData.words.forEach((data, index) => {
    const word = data.word.toUpperCase();
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const direction = Math.random() < 0.5 ? 'across' : 'down';

      if (canPlaceWord(word, row, col, direction)) {
        const placedCells = placeWord(word, row, col, direction);
        wordsPlaced.push({
          word: word,
          clue: data.clue,
          row: row,
          col: col,
          direction: direction,
          index: index + 1,
          cells: placedCells
        });
        placed = true;
      }
      attempts++;
    }
    if (!placed) {
      console.warn(`Could not place word: ${word}`);
    }
  });

  // Renderizar a grade
  const table = document.createElement('table');
  table.classList.add('crossword-grid');
  for (let r = 0; r < gridSize; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c < gridSize; c++) {
      const td = document.createElement('td');
      td.classList.add('crossword-cell');
      if (grid[r][c] !== '') {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '1';
        input.dataset.row = r;
        input.dataset.col = c;
        td.appendChild(input);
      } else {
        td.classList.add('empty-cell');
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  crosswordContainer.appendChild(table);

  // Adicionar números de dica e dicas
  wordsPlaced.forEach(wordData => {
    const cell = crosswordContainer.querySelector(`[data-row="${wordData.row}"][data-col="${wordData.col}"]`);
    if (cell) {
      const clueNumber = document.createElement('span');
      clueNumber.classList.add('clue-number');
      clueNumber.textContent = wordData.index;
      cell.parentNode.insertBefore(clueNumber, cell);
    }

    const clueItem = document.createElement('li');
    clueItem.textContent = `${wordData.index}. ${wordData.clue}`;
    if (wordData.direction === 'across') {
      acrossCluesContainer.appendChild(clueItem);
    } else {
      downCluesContainer.appendChild(clueItem);
    }
  });

  // Lógica para verificar a cruzadinha (opcional, pode ser adicionada depois)
  // Adicionar event listeners para inputs
  crosswordContainer.addEventListener('input', (event) => {
    const input = event.target;
    if (input.tagName === 'INPUT') {
      input.value = input.value.toUpperCase();
      // Mover para o próximo input
      const currentRow = parseInt(input.dataset.row);
      const currentCol = parseInt(input.dataset.col);
      let nextInput = null;

      // Find the word this input belongs to
      const wordInfo = wordsPlaced.find(wp => 
        wp.cells.some(cell => cell.row === currentRow && cell.col === currentCol)
      );

      if (wordInfo) {
        const currentCellIndex = wordInfo.cells.findIndex(cell => cell.row === currentRow && cell.col === currentCol);
        if (currentCellIndex < wordInfo.cells.length - 1) {
          const nextCell = wordInfo.cells[currentCellIndex + 1];
          nextInput = crosswordContainer.querySelector(`[data-row="${nextCell.row}"][data-col="${nextCell.col}"]`);
        }
      }

      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});


