# Selenium WhatsApp Message Sender

## Description
This is a Node.js script that automates sending messages via WhatsApp Web using Selenium WebDriver. It reads phone numbers and messages from an Excel file and sends messages accordingly.

## Requirements
- Node.js installed on your machine
- Google Chrome installed
- WhatsApp account logged in on WhatsApp Web

## Dependencies
- `selenium-webdriver`: For browser automation
- `exceljs`: For reading Excel files

## Installation
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Configuration
1. Adjust the `userDataDir` variable to specify the directory where Chrome user data will be stored.
2. Place your WhatsApp session ID in the `user-data-dir` directory.
3. Create an Excel file named `datos.xlsx` with two columns: phone numbers and messages.

## Usage
1. Run the script using `node filename.js`.
2. The script will open WhatsApp Web, read data from the Excel file, and send messages to the specified numbers.

## Code Documentation
- `const { Builder, By, Key, until } = require("selenium-webdriver")`: Imports required modules from Selenium WebDriver.
- `const chrome = require("selenium-webdriver/chrome")`: Imports Chrome module for Selenium WebDriver.
- `const ExcelJS = require("exceljs")`: Imports ExcelJS module for reading Excel files.
- `async function main() { ... }`: Main function that orchestrates the sending of messages.
- `const userDataDir = "./user-data-dir";`: Specifies the directory to store Chrome user data.
- `const driver = await new Builder() ... .build();`: Initializes the Selenium WebDriver with Chrome options.
- `const workbook = new ExcelJS.Workbook();`: Creates a new ExcelJS workbook instance.
- `await workbook.xlsx.readFile("datos.xlsx");`: Reads data from the Excel file.
- `for (let i = 2; i <= worksheet.rowCount; i++) { ... }`: Iterates over each row in the Excel file.
- `await driver.get("https://web.whatsapp.com/");`: Opens WhatsApp Web in the browser.
- `await driver.wait(until.elementLocated(By.css("._2vDPL")), 60000);`: Waits for the WhatsApp Web page to load.
- `await driver.findElement(By.css("._2vDPL")).click();`: Clicks on the input field to select a contact.
- `await driver.findElement(By.css("...")).sendKeys(number, Key.RETURN);`: Enters the phone number and presses Enter.
- `await driver.wait(until.elementLocated(By.css("...")), 10000);`: Waits for the message input field to load.
- `await driver.findElement(By.css("...")).sendKeys(message, Key.RETURN);`: Enters the message and sends it.
- `await driver.sleep(12000);`: Delays execution before sending another message.
- `await driver.quit();`: Quits the Selenium WebDriver instance.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

