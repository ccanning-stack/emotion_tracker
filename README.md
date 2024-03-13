# Insightful Emotions

This project was designed, developed and tested for my Web Development Module for my MSc in Software Development.

It involves a HTTPS implementation of an Emotion Tracker Web App and API, enabling users to record and track their emotions through snapshots at arbitrary times throughout the day, in order to gain insights into potential situations and triggers that affect them, by analysing the data over time.

## Technologies Used

The technologies used for this project include HTML, CSS, and Vanilla JavaScript for both client side and server side leveraging Node JS / Express JS.  MAMP was used with an Apache web server, with a MySQL database through phpMyAdmin.  Many different third party modules were also used throughout:

<ul>
<li>express-validator</li>
<li>nodemon</li>
<li>Chart.js</li>
<li>bcrypt</li>
<li>https</li>
<li>Bootstrap</li>
<li>JQuery</li>
<li>morgan</li>
<li>jsonwebtoken</li>
<li>mysql2</li>
<li>express</li>
<li>dotenv</li>
<li>cookie-parser</li>
<li>axios</li>
<li>ejs</li>
<li>Postman</li>
</ul>

## Installation

To get started with the `emotion_tracker` project, follow these steps to install it on your local machine:

1. **Install MAMP**

The free version is sufficient.

2. **Clone the repository**

   First, clone the repository using Git:
   git clone https://github.com/ccanning-stack/emotion_tracker.git

   This command creates a local copy of the repository on your machine.

3. **Navigate to the project directory**

   Change into the project directory with:
   cd emotion_tracker

4. **Install dependencies**

   Install the necessary dependencies by running:
   npm install

5. **Ensure all HTTPS filepaths and configuration files are accurate**

Please ensure you are leveraging the HTTPS configuration files in the repo "as is" for ease of configuration of HTTPS. 

All you should need to do is check and verify that all HTTPS paths in configuration files and in the Web App and API themselves are pointing to the right path in your environment.  Additional screenshots including paths have been provided for clarity.

6. **Run the application**

   Start the application with:
   npm start
