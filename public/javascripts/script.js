// Form validation
(function() {
    'use strict';
    
    // Fetch all forms that need validation
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop over and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        form.classList.add('was-validated');
      }, false);
    });
    
    // Confirm delete
    const deleteButtons = document.querySelectorAll('.btn-delete');
    Array.from(deleteButtons).forEach(button => {
      button.addEventListener('click', event => {
        if (!confirm('Are you sure you want to delete this book?')) {
          event.preventDefault();
        }
      });
    });
  })();