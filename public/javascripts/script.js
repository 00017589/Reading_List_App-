document.addEventListener('DOMContentLoaded', function() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // enabling popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // timeout
  setTimeout(function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }, 5000);

  // validation forms
  const bookForms = document.querySelectorAll('.book-form');
  bookForms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      if (!validateBookForm(form)) {
        event.preventDefault();
      }
    });
  });

  const statusSelect = document.getElementById('status');
  const statusBadgePreview = document.getElementById('status-badge-preview');
  
  if (statusSelect && statusBadgePreview) {
    statusSelect.addEventListener('change', function() {
      updateStatusBadge(this.value, statusBadgePreview);
    });
    
    if (statusSelect.value) {
      updateStatusBadge(statusSelect.value, statusBadgePreview);
    }
  }

  setActiveNavigation();
});

/**
 * validation of inputs of book form
 * @param {HTMLFormElement} form 
 * @returns {boolean} 
 */
function validateBookForm(form) {
  let isValid = true;
  
  // checking for fields
  const title = form.querySelector('#title');
  const author = form.querySelector('#author');
  
  if (!title.value.trim()) {
    highlightInvalidField(title, 'Title is required');
    isValid = false;
  } else {
    resetValidationState(title);
  }
  
  if (!author.value.trim()) {
    highlightInvalidField(author, 'Author is required');
    isValid = false;
  } else {
    resetValidationState(author);
  }
  
  return isValid;
}

/**
 * highligt invalid field
 * @param {HTMLElement} field 
 * @param {string} message 
 */
function highlightInvalidField(field, message) {
  field.classList.add('is-invalid');
  
  // validation message ...
  let feedbackElement = field.nextElementSibling;
  if (!feedbackElement || !feedbackElement.classList.contains('invalid-feedback')) {
    feedbackElement = document.createElement('div');
    feedbackElement.className = 'invalid-feedback';
    field.parentNode.insertBefore(feedbackElement, field.nextElementSibling);
  }
  
  feedbackElement.textContent = message;
}

/**
 * resetting validation state
 * @param {HTMLElement} field 
 */
function resetValidationState(field) {
  field.classList.remove('is-invalid');
  
  const feedbackElement = field.nextElementSibling;
  if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
    feedbackElement.remove();
  }
}

/**
 * updating badge
 * @param {string} status 
 * @param {HTMLElement} badgeElement 
 */
function updateStatusBadge(status, badgeElement) {
  badgeElement.classList.remove('bg-secondary', 'bg-primary', 'bg-success');
  
  switch (status) {
    case 'to read':
      badgeElement.classList.add('bg-secondary');
      break;
    case 'reading':
      badgeElement.classList.add('bg-primary');
      break;
    case 'completed':
      badgeElement.classList.add('bg-success');
      break;
  }
  
  badgeElement.textContent = status;
}

function setActiveNavigation() {
  const currentUrl = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href !== '/' && currentUrl.startsWith(href)) {
      link.classList.add('active');
    } else if (href === '/' && currentUrl === '/') {
      link.classList.add('active');
    }
  });
}

/**
 * confirm deletion
 * @returns {boolean} 
 */
function confirmDelete() {
  return confirm('Are you sure you want to remove this book from your reading list?');
}