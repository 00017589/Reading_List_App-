(function() {
    'use strict';
    
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        form.classList.add('was-validated');
      }, false);
    });
    
    const deleteButtons = document.querySelectorAll('.btn-delete');
    Array.from(deleteButtons).forEach(button => {
      button.addEventListener('click', event => {
        if (!confirm('Are you sure you want to delete this book?')) {
          event.preventDefault();
        }
      });
    });
  })();