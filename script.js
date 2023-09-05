function generateInitMcFunction() {
    let rows = document.querySelectorAll(".sidebar-entry"); // Corrected variable name
    let initMcFunction = "";

    // Reverse the rows
    rows = Array.from(rows).reverse();

    // Add this line to create the "empty_row" team
    initMcFunction += "# Empty Row\n";
    initMcFunction += "team add empty_row\n";
    initMcFunction += "team modify empty_row color red\n";

    // Retrieve the title text from the contenteditable element
    const titleText = document.querySelector(".title-text").textContent.trim();

    // Add this code to create the sidebar objective and set the display with the retrieved title
    initMcFunction += `scoreboard objectives add sidebar dummy {"text":"${titleText}","bold":true,"color":"yellow"}\n`;
    initMcFunction += "scoreboard objectives setdisplay sidebar sidebar\n\n";

    rows.forEach((row, index) => {
        const rowNumber = index + 1; // Row numbers start from 1
        const rowText = row.querySelector(".row-text").textContent.trim();

        // Add spacing and indentation for readability
        initMcFunction += `\n# Row ${rowNumber}\n`;

        // Set the row number in the sidebar objective
        initMcFunction += `scoreboard players set ${rowNumber} sidebar ${rowNumber}\n`;

        // Join the empty_row team for empty rows
        if (!rowText) {
            initMcFunction += `team join empty_row ${rowNumber}\n`;
        }

        // Join/create and modify the team for non-empty rows
        if (rowText) {
            initMcFunction += `scoreboard players set ${rowNumber} sidebar ${rowNumber}\n`;
            initMcFunction += `team add row_${rowNumber}\n`;
            initMcFunction += `team join row_${rowNumber} ${rowNumber}\n`;

            const color = "red"; // Set the color as needed

            initMcFunction += `team modify row_${rowNumber} color ${color}\n`;
            initMcFunction += `team modify row_${rowNumber} suffix {"text":"${rowText}","bold":false,"color":"white"}\n`;
        }
    });

    console.log(initMcFunction); // Output the formatted generated function for debugging

    // You can then do whatever you want with the formatted generated function, such as saving it to a file.

    // You can then do whatever you want with the generated function, such as saving it to a file.



    // Create a Blob object for downloading
    const initBlob = new Blob([initMcFunction], { type: "text/plain" });

    // Create a download link and trigger the download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(initBlob);
    a.download = "init.mcfunction";
    a.click();

    // Revoke the URL object to release memory
    URL.revokeObjectURL(a.href);
}

// Function to generate rows dynamically in descending order
function generateRowsDescending() {
    const sidebarEntries = document.getElementById("sidebar-entries");

    for (let i = 15; i >= 1; i--) {
        const listItem = document.createElement("li");
        listItem.classList.add("sidebar-entry");

        const rowNumber = document.createElement("span");
        rowNumber.classList.add("row-number");
        rowNumber.textContent = i;

        const rowText = document.createElement("span");
        rowText.classList.add("row-text");
        rowText.contentEditable = true;
        rowText.textContent = " ";

        const rowNumberFake = document.createElement("span");
        rowNumberFake.classList.add("row-number-fake");
        rowNumberFake.textContent = i;

        listItem.appendChild(rowNumber);
        listItem.appendChild(rowText);
        listItem.appendChild(rowNumberFake);

        sidebarEntries.appendChild(listItem);
    }
}

// Call the function when the page loads
window.addEventListener("load", generateRowsDescending);

// Add an event listener to the Generate Init button
document.getElementById("generate-init-button").addEventListener("click", generateInitMcFunction);





