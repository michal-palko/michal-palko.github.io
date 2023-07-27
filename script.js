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
    gtag('event', 'theme_toggle', {
      event_category: 'theme',
      event_label: 'light_theme',
    });
    body.classList.remove('light-mode'); // remove light mode
    body.classList.add('dark-mode'); // add dark mode
    updateThemeLabel('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  } else {
    gtag('event', 'theme_toggle', {
      event_category: 'theme',
      event_label: 'dark_theme',
    });
    body.classList.remove('dark-mode'); // remove dark mode
    body.classList.add('light-mode'); // add light mode
    updateThemeLabel('light-mode');
    localStorage.setItem('theme', 'light-mode');
  }
});

function updateThemeLabel(theme) {
  if (theme === 'dark-mode') {
    themeLabel.textContent = 'Burn your eyes';
    themeLabel.style.color = '#fff'; // Set text color for dark theme
    footer.style.color = '#fff'; // Set text color for dark theme in the footer
    footer.style.backgroundColor = '#333'; // Set footer background color for dark mode
    body.style.backgroundColor = '#333'; 
    body.style.color = '#fff';
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
    footer.style.backgroundColor = '#fff'; // Set footer background color for light mode
    body.style.backgroundColor = '#fff';
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
      gtag('event', 'social_icon', {
        event_category: 'icon',
        event_label: 'twitter',
      });
    } else if (socialMedia === 'LinkedIn') {
      gtag('event', 'social_icon', {
        event_category: 'icon',
        event_label: 'linkedin',
      });
    } else {
      gtag('event', 'social_icon', {
        event_category: 'icon',
        event_label: 'pornhub',
      });
    }
  
    // Display the pop-up message
    alert(message);
  }
  
  function refreshFirstTime() {
    if (!localStorage.getItem("firstVisit")) {
      // Set the flag in localStorage to indicate it's the first visit
      localStorage.setItem("firstVisit", "true");
  
      // Perform the reload
      window.location.reload();
      console.log("page reloaded");
    }
  }