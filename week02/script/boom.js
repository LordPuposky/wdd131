// Get reference to the text input where user types their favorite chapter
const input = document.querySelector('#favchap');

// Get reference to the "Add Chapter" button
const button = document.querySelector('button');

// Get reference to the list (ul) where added chapters will be displayed
const list = document.querySelector('#list');

// Add event listener to respond when user clicks the button
button.addEventListener('click', function() {
    // Check if input field is not empty after removing spaces (to prevent blank entries)
    if (input.value.trim() !== '') {
        // Create the list item element for the new chapter
        const li = document.createElement('li');
        li.textContent = input.value;

        // Create the delete button for removing chapters individually
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        // Add accessibility label using the entered chapter name
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        // When delete button is clicked, remove only this element from list and focus the input
        deleteButton.addEventListener('click', function() {
            list.removeChild(li);
            input.focus();
        });

        // Add the delete button inside the li element
        li.append(deleteButton);

        // Add the new chapter to the visible list on screen
        list.append(li);

        // Clear the input field and focus it again to easily add another chapter
        input.value = '';
        input.focus();
    } else {
        // If user tries to add empty field, simply focus the input again
        input.focus();
    }
});
