const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
             if (checkbox.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.checked = false;
                          }
                      });
                  }
              });
          });
//Tamaño de texto
const buttons = document.querySelectorAll('.text-size-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        if (button.id === 'smallText') {
            content.style.fontSize = '12px';
        } else if (button.id === 'mediumText') {
            content.style.fontSize = '16px';
        } else if (button.id === 'largeText') {
            content.style.fontSize = '20px';
        }
    });
});

// Tamaño de letras
