const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const body = document.body;
const footer = document.querySelector('footer');
const socialIconTwitter = document.querySelector('.social-icons-top .fab.fa-twitter');
const socialIconLinkedin = document.querySelector('.social-icons-top .fab.fa-linkedin');
const socialIconPornhub = document.getElementById('custom-icon');


// Check the user's theme preference from local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.classList.add(currentTheme);
  updateThemeLabel(currentTheme); // Update the theme label text and color
}

themeToggle.addEventListener('change', () => {
  if (body.classList.contains('light-mode')) {
    // If the current theme is light, switch to dark
    body.classList.replace('light-mode', 'dark-mode');
    body.style.backgroundColor = '#333'; 
    footer.style.backgroundColor = '#333'; // Set footer background color for dark mode
    updateThemeLabel('dark-mode'); // Update the theme label text and color
    localStorage.setItem('theme', 'dark-mode');
  } else {
    // If the current theme is dark, switch to light
    body.classList.replace('dark-mode', 'light-mode');
    footer.style.backgroundColor = '#fff'; // Set footer background color for light mode
    body.style.backgroundColor = '#fff';
    updateThemeLabel('light-mode'); // Update the theme label text and color
    localStorage.setItem('theme', 'light-mode');
  }
});

function updateThemeLabel(theme) {
  if (theme === 'dark-mode') {
    themeLabel.textContent = 'Burn your eyes';
    themeLabel.style.color = '#fff'; // Set text color for dark theme
    footer.style.color = '#fff'; // Set text color for dark theme in the footer
    socialIconTwitter.style.color = '#fff';
    socialIconLinkedin.style.color = '#fff';
    // socialIconPornhub.style.color = '#fff';
    socialIconPornhub.src = 'phicon.png';
    // socialIconsTop.forEach(icon => {
    //   icon.style.color = '#fff'; // Invert the color of the social icons for dark theme
    // });
  } else {
    themeLabel.textContent = 'Quickly back!';
    themeLabel.style.color = '#000'; // Set text color for light theme
    footer.style.color = '#000'; // Set text color for light theme in the footer
    body.style.color = '#000';
    socialIconTwitter.style.color = '#000';
    socialIconLinkedin.style.color = '#000';
    // socialIconPornhub.style.color = '#000';
    socialIconPornhub.src = 'phicon_wh.png';
    // socialIconsTop.forEach(icon => {
    //   icon.style.color = '#000'; // Reset the color of the social icons for light theme
    // });
  }
}


function showPopup(socialMedia) {
    let message = '';
  
    // Check which social media icon was clicked and set the appropriate message
    if (socialMedia === 'Twitter') {
      message = 'Elon ruined it.';
    } else if (socialMedia === 'LinkedIn') {
      message = 'You clicked on the LinkedIn icon!';
    } else {
      message = 'You clicked on an unknown social media icon!';
    }
  
    // Display the pop-up message
    alert(message);
  }
  