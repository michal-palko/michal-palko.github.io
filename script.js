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
    getInfoAndWriteToCloudant();
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


function trackClickEvent(socialMedia) {
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
  }
  

  const button = document.querySelector(".collapsible-button");
  const content = document.querySelector(".collapsible-content");

  button.addEventListener("click", function () {
    if (content.style.display === "none") {
      content.style.display = "block";
      button.textContent = "I don't want to see it anymore"; // Change button text when expanded
      localStorage.setItem("isCollapsed", "false");
    } else {
      content.style.display = "none";
      button.textContent = "Rabbit hole of references"; // Change button text when collapsed
      localStorage.setItem("isCollapsed", "true");
    }
  });

  // Check the saved state in localStorage on page load
  const isCollapsed = localStorage.getItem("isCollapsed") === "true";
  if (isCollapsed) {
    content.style.display = "none"; // Collapse the content
    button.textContent = "Rabbit hole of references"; // Set initial button text
  } else {
    content.style.display = "block"; // Expand the content
    button.textContent = "I don't want to see it anymore"; // Set initial button text
  }


    // Remove the isCollapsed item from localStorage if the button is clicked and the content is expanded
    window.addEventListener("beforeunload", function () {
      if (content.style.maxHeight !== "0px") {
        localStorage.removeItem("isCollapsed");
      }
    });

    // By default, set the collapsible content to be collapsed
    content.style.display = "none";
    button.textContent = "Rabbit hole of references";



  // const button = document.querySelector(".collapsible-button");
  // const content = document.querySelector(".collapsible-content");

  // button.addEventListener("click", function () {
  //   if (content.style.display === "block") {
  //     content.style.display = "none";
  //     button.textContent = "Expand Section";
  //   } else {
  //     content.style.display = "block";
  //     button.textContent = "Collapse Section";
  //   }
  // });



    // Function to send data to Cloudant
    function writeToCloudant(data) {
      const cloudantURL = 'https://18a02f06-b509-413d-a320-dcb7a06c38c9-bluemix.cloudantnosqldb.appdomain.cloud/'; // Replace with your Cloudant URL
      const username = 'apikey-300051e017cf4be6bfae3dc7a675868e'; // Replace with your Cloudant username
      const password = '5ae1a88eda0156917c938e7e14fa3150d711016e'; // Replace with your Cloudant password
      const databaseName = 'resume'; // Replace with your database name
  
      // Create the basic auth header
      const basicAuth = btoa(username + ':' + password);
  
      // Construct the request options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + basicAuth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
  
      // Make the API call to Cloudant
      fetch(`${cloudantURL}/${databaseName}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to write data to Cloudant');
          }
          return response.json();
        })
        .then(responseData => {
          console.log('Data written successfully:', responseData);
        })
        .catch(error => {
          console.error('Error writing data to Cloudant:', error);
        });
    }
  
    // Function to get information about user's computer
    function getInfoAndWriteToCloudant() {
      // Modify this function to gather information about the user's computer.
      // For example, you can use libraries like Fingerprintjs or detect.js to get more detailed information.
      const userComputerInfo = {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        // Add more properties as needed.
      };
  
      // Call the function to write data to Cloudant
      writeToCloudant(userComputerInfo);
      console.log('data sent')
    }
  
    // Call the function when the page loads
    getInfoAndWriteToCloudant();