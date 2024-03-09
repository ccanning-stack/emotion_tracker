//with assistance from ChatGPT

function updateTableCellColors() {
    // Select all <td> elements
    var cells = document.querySelectorAll('td');

    // Iterate over each <td> element
    cells.forEach(function(cell) {
        var content = cell.textContent.trim(); // Get the text content of the cell, removing leading/trailing whitespace
        if (content.charAt(0) === '↓') {
            // If the first character is a downward arrow, set text color to red
            cell.style.color = 'rgb(180, 0, 0)';
        } else if (content.charAt(0) === '↑') {
            // If the first character is an upward arrow, set text color to green
            cell.style.color = 'rgb(0, 128, 0)';
        }
    });
}

// Call the function to update table cell colors
updateTableCellColors();
