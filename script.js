// Function to create event and people reached input fields
function createEventInput(eventIndex) {
    var eventsContainer = document.getElementById('events-container');

    var eventInput = document.createElement('div');
    eventInput.classList.add('event-input');

    eventInput.innerHTML = `
        <label for="eventType${eventIndex}">Event Type:</label>
        <select class="event-type" id="eventType${eventIndex}" onchange="handleEventTypeChange(this)">
            <option value=""></option>
            <option value="podcast">Podcast</option>
            <option value="social-media">Social Media</option>
            <option value="classroom-talk">Classroom Talk or Visit</option>
            <option value="lay-summary">Lay Summary</option>
            <option value="news-article">News Article</option>
            <option value="general-talk">General Talk</option>
            <option value="other">OTHER</option>
        </select>

        <div class="event-description" id="eventDescription${eventIndex}" style="display:none;">
            <label for="eventDescriptionText${eventIndex}">What was the event?</label>
            <input type="text" id="eventDescriptionText${eventIndex}" placeholder="Enter event description">
        </div>

        <label for="peopleReached${eventIndex}">Number of People Reached:</label>
        <input type="number" class="people-reached" id="peopleReached${eventIndex}" placeholder=" ">
    `;

    eventsContainer.appendChild(eventInput);
}

// Function to handle the change in event type
function handleEventTypeChange(selectElement) {
    var eventIndex = selectElement.id.replace('eventType', '');
    var eventDescriptionDiv = document.getElementById('eventDescription' + eventIndex);
    var eventDescriptionText = document.getElementById('eventDescriptionText' + eventIndex);

    // Show/hide event description based on the selected event type
    if (selectElement.value === 'other') {
        eventDescriptionDiv.style.display = 'block';
        eventDescriptionText.required = true; // Make the textbox required
    } else {
        eventDescriptionDiv.style.display = 'none';
        eventDescriptionText.required = false; // Make the textbox not required
    }
}

// Function to add a new event dynamically
function addEvent() {
    var eventsContainer = document.getElementById('events-container');

    // Get the number of existing events
    var existingEventCount = document.querySelectorAll('.event-input').length;

    // Create a new set of event and people reached input fields
    createEventInput(existingEventCount + 1);
}

// Calculate C-Index function
function calculateCIndex() {
    console.log("calculateCIndex function called");

    // Get input values for all events and people reached
    var events = [];
    var eventInputs = document.querySelectorAll('.event-input');
    for (var i = 0; i < eventInputs.length; i++) {
        var peopleReached = parseInt(eventInputs[i].querySelector('.people-reached').value);
        var eventType = eventInputs[i].querySelector('.event-type').value;

        // Additional input for "OTHER" event type
        var eventDescriptionText = eventInputs[i].querySelector('.event-description input');
        var eventDescription = (eventType.toLowerCase() === 'other') ? eventDescriptionText.value : '';

        // Validate input
        if (isNaN(peopleReached) || peopleReached < 0 || (eventType.toLowerCase() === 'other' && eventDescription.trim() === '')) {
            alert('Please enter valid data for all events.');
            return;
        }

        // Add event to the array
        events.push({ peopleReached: peopleReached, type: eventType, description: eventDescription });
    }

    // Sort events in descending order based on people reached
    events.sort(function (a, b) {
        return b.peopleReached - a.peopleReached;
    });

    // Calculate C-Index (similar to academic H-Index)
    var cIndex = 0;
    for (var i = 0; i < events.length; i++) {
        if (events[i].peopleReached >= (i + 1)) {
            cIndex = i + 1;
        } else {
            break; // Break if the condition is not met
        }
    }

    // Display result
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    var resultParagraph = document.createElement('p');
    resultParagraph.innerText = 'C-Index: ' + cIndex;
    resultsContainer.appendChild(resultParagraph);
}
