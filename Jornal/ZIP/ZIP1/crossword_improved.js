document.addEventListener('DOMContentLoaded', () => {
  const crosswordContainer = document.getElementById('crossword-container');
  const acrossCluesContainer = document.getElementById('across-clues');
  const downCluesContainer = document.getElementById('down-clues');

  // Definindo uma grade pré-configurada para garantir que as palavras se encaixem bem
  const gridSize = 15;
  let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  
  // Palavras e suas posições pré-definidas para uma cruzadinha funcional
  const wordsPlaced = [
    { word: "TELESCOPIO", clue: "Instrumento que permitiu a James Webb revelar imagens inéditas do universo.", row: 2, col: 3, direction: "across", index: 1 },
    { word: "REAL", clue: "Moeda brasileira que estabilizou a economia após a hiperinflação.", row: 5, col: 7, direction: "down", index: 2 },
    { word: "OURO", clue: "Metal precioso que a Seleção Brasileira olímpica busca nos Jogos de Paris.", row: 8, col: 1, direction: "across", index: 3 },
    { word: "INFLACAO", clue: "Fenômeno econômico combatido pelo Plano Real.", row: 1, col: 9, direction: "down", index: 4 },
    { word: "GALAXIAS", clue: "Estruturas cósmicas distantes observadas pelo Telescópio James Webb.", row: 6, col: 2, direction: "across", index: 5 },
    { word: "PARIS", clue: "Cidade-sede dos Jogos Olímpicos onde a Seleção Brasileira estreou com vitória.", row: 10, col: 5, direction: "across", index: 6 },
    { word: "ASTRONOMIA", clue: "Ciência que estuda os corpos celestes e o universo.", row: 4, col: 11, direction: "down", index: 7 },
    { word: "BRASIL", clue: "País que enfrentou hiperinflação e implementou o Plano Real.", row: 12, col: 8, direction: "across", index: 8 }
  ];

  // Colocar as palavras na grade
  wordsPlaced.forEach(wordData => {
    const word = wordData.word;
    const { row, col, direction } = wordData;
    
    if (direction === 'across') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
      }
    } else { // down
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = word[i];
      }
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
        input.dataset.answer = grid[r][c];
        td.appendChild(input);
        
        // Adicionar número da dica se for o início de uma palavra
        const wordStart = wordsPlaced.find(wp => wp.row === r && wp.col === c);
        if (wordStart) {
          const clueNumber = document.createElement('span');
          clueNumber.classList.add('clue-number');
          clueNumber.textContent = wordStart.index;
          td.appendChild(clueNumber);
        }
      } else {
        td.classList.add('empty-cell');
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  crosswordContainer.appendChild(table);

  // Adicionar dicas
  const acrossUl = document.createElement('ul');
  const downUl = document.createElement('ul');
  
  wordsPlaced.forEach(wordData => {
    const clueItem = document.createElement('li');
    clueItem.textContent = `${wordData.index}. ${wordData.clue}`;
    
    if (wordData.direction === 'across') {
      acrossUl.appendChild(clueItem);
    } else {
      downUl.appendChild(clueItem);
    }
  });
  
  acrossCluesContainer.appendChild(acrossUl);
  downCluesContainer.appendChild(downUl);

  // Adicionar funcionalidade de verificação
  const checkButton = document.createElement('button');
  checkButton.textContent = 'Verificar Respostas';
  checkButton.classList.add('check-button');
  crosswordContainer.appendChild(checkButton);

  // Event listeners
  crosswordContainer.addEventListener('input', (event) => {
    const input = event.target;
    if (input.tagName === 'INPUT') {
      input.value = input.value.toUpperCase();
      
      // Auto-move to next cell
      const currentRow = parseInt(input.dataset.row);
      const currentCol = parseInt(input.dataset.col);
      
      // Find next input in the same word
      let nextInput = null;
      const nextCol = currentCol + 1;
      const nextRow = currentRow + 1;
      
      // Try horizontal first
      if (nextCol < gridSize && grid[currentRow][nextCol] !== '') {
        nextInput = crosswordContainer.querySelector(`[data-row="${currentRow}"][data-col="${nextCol}"]`);
      }
      // Then try vertical
      else if (nextRow < gridSize && grid[nextRow][currentCol] !== '') {
        nextInput = crosswordContainer.querySelector(`[data-row="${nextRow}"][data-col="${currentCol}"]`);
      }
      
      if (nextInput) {
        nextInput.focus();
      }
    }
  });

  checkButton.addEventListener('click', () => {
    const inputs = crosswordContainer.querySelectorAll('input');
    let correct = 0;
    let total = inputs.length;
    
    inputs.forEach(input => {
      if (input.value === input.dataset.answer) {
        input.style.backgroundColor = '#d4edda';
        correct++;
      } else {
        input.style.backgroundColor = '#f8d7da';
      }
    });
    
    const percentage = Math.round((correct / total) * 100);
    alert(`Você acertou ${correct} de ${total} letras (${percentage}%)!`);
  });
});

