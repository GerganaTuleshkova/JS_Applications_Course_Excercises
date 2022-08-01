let notificationContainer = document.getElementById('errorBox');
let span = notificationContainer.querySelector('span');

export function notify(message) {
    span.textContent = message;    
    notificationContainer.style.display = 'block';

    setTimeout(() => notificationContainer.style.display = 'none', 3000);
}