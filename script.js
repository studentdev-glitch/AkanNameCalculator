// Akan Names Dictionary
const akanNames = {
    male: ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"],
    female: ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"]
};

// Validate Date Input
const validateDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    // Check year, month, and day validity
    if (year < 1900 || year > new Date().getFullYear()) {
        return { valid: false, message: "Please enter a valid year between 1900 and current year." };
    }

    if (month <= 0 || month > 12) {
        return { valid: false, message: "Please enter a valid month (1-12)." };
    }

    if (day <= 0 || day > 31) {
        return { valid: false, message: "Please enter a valid day (1-31)." };
    }

    // Additional month-specific day validation
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
        return { valid: false, message: `Invalid day for the selected month. Maximum is ${daysInMonth}.` };
    }

    return { valid: true };
};

// Calculate Day of Week using Akan formula
const calculateDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const CC = Math.floor(year / 100);
    const YY = year % 100;
    const MM = month;
    const DD = day;

    const dayCalc = Math.floor(((CC/4) - 2*CC - 1) + ((5*YY/4)) + ((26*(MM+1)/10)) + DD) % 7;
    return dayCalc;
};

// Event Listener for Generate Button
document.querySelector('.discover-row-2 button').addEventListener('click', () => {
    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    // Validate inputs
    if (!name || !dob || !gender) {
        alert("Please fill out all fields!");
        return;
    }
    // Validate date
    const dateValidation = validateDate(dob);
    if (!dateValidation.valid) {
        alert(dateValidation.message);
        return;
    }

    // Calculate Akan Name
    const dayOfWeek = calculateDayOfWeek(dob);
    const akanName = gender === "Male" 
        ? akanNames.male[dayOfWeek] 
        : akanNames.female[dayOfWeek];

    // Update Akan Name Display
    const nameOutput = document.querySelector('.discover-row-1 p');
    nameOutput.textContent = `${akanName} (${name})`;
});