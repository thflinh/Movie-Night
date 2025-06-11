/*** Dark Mode ***/ 
// Step 1: Select the theme button
const themeButton = document.getElementById('theme-button');

// Verify the button exists
if (!themeButton) {
    console.error("Could not find theme button!");
}

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    console.log("Toggled dark mode!"); // For debugging
}

// Step 3: Register event listener if button exists
if (themeButton) {
    themeButton.addEventListener('click', toggleDarkMode);
}

/*** Form Handling and Validation ***/

// Step 1: Query for the submit RSVP button
const rsvpButton = document.getElementById('rsvp-button');
let count = 0; // Initial count
let isMotionEnabled = true; // For reduce motion stretch feature

const addParticipant = (person) => {
    // Add new participant
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd.`;
    
    const participantsDiv = document.querySelector('.rsvp-participants');
    participantsDiv.appendChild(newParticipant);
    
    // Update RSVP count
    count++;
    const rsvpCount = document.getElementById('rsvp-count');
    rsvpCount.textContent = `⭐ ${count} people have RSVP'd to this event!`;
    //rsvpCount.remove();
    
    // const newCount = document.createElement('p');
    // newCount.id = 'rsvp-count';
    // newCount.textContent = `⭐ ${count} people have RSVP'd to this event!`;
    
    // const rsvpSection = document.getElementById('rsvp');
    // rsvpSection.insertBefore(newCount, document.querySelector('.rsvp-container'));
    
    // Show modal
    toggleModal(person);
}

const validateForm = () => {
    let containsErrors = false;
    
    const rsvpInputs = document.getElementById('rsvp-form').elements;
    
    // Create person object
    let person = {
        name: rsvpInputs[0].value,
        email: rsvpInputs[1].value,
        state: rsvpInputs[2].value
    };
    
    // Validate inputs
    for (let i = 0; i < rsvpInputs.length; i++) {
        if (rsvpInputs[i].value.length < 2) {
            containsErrors = true;
            rsvpInputs[i].classList.add('error');
        } else {
            rsvpInputs[i].classList.remove('error');
        }
    }
    
    // Validate email for @ symbol
    if (!person.email.includes('@')) {
        containsErrors = true;
        document.getElementById('rsvp-email').classList.add('error');
    } else if (person.email.length >= 2) {
        document.getElementById('rsvp-email').classList.remove('error');
    }
    
    // If no errors, add participant
    if (!containsErrors) {
        addParticipant(person);
        // Clear form
        rsvpInputs[0].value = '';
        rsvpInputs[1].value = '';
        rsvpInputs[2].value = '';
    }
}

// Step 3: Add event listener
if (rsvpButton) {
    rsvpButton.addEventListener('click', validateForm);
}

/*** Modal ***/

// Animation variables
let rotateFactor = 0;
const modalImage = document.querySelector('#modal-img');

const animateImage = () => {
    if (!isMotionEnabled) return; // Skip animation if motion is disabled
    rotateFactor = rotateFactor === 0 ? -10 : 0;
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

const toggleModal = (person) => {
    let modal = document.getElementById('success-modal');
    let modalText = document.getElementById('modal-text');
    
    // Update modal text
    modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at Movie Night! 🌟`;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Start animation
    let intervalId = setInterval(animateImage, 500);
    
    // Hide modal after 5 seconds
    setTimeout(() => {
        modal.style.display = 'none';
        clearInterval(intervalId);
    }, 5000);
}

/*** Modal Close Button (Stretch) ***/
const closeButton = document.getElementById('modal-close');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        let modal = document.getElementById('success-modal');
        modal.style.display = 'none';
    });
}

/*** Reduce Motion (Stretch) ***/
const reduceMotionButton = document.getElementById('reduce-motion-button');
if (reduceMotionButton) {
    reduceMotionButton.addEventListener('click', () => {
        isMotionEnabled = !isMotionEnabled;
        reduceMotionButton.textContent = isMotionEnabled ? 'Reduce Motion' : 'Enable Motion';
    });
}

// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// 📝 RSVP Form Submission
const form = document.getElementById('rsvp-form');
const message = document.getElementById('rsvp-message');

form?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = form.querySelector('input').value.trim();
  if (name) {
    message.textContent = `🎉 Thanks for RSVPing, ${name}!`;
    form.reset();
  } else {
    message.textContent = `Please enter your name 😊`;
  }
});

// ✨ Scroll Reveal Animation for Sections
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add('visible');
    }
  });
});

// Trigger on load
window.dispatchEvent(new Event('scroll'));