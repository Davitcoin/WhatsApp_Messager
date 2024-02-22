const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); 
const ExcelJS = require("exceljs");

async function main() {
  // Where to store whatsapp session id
  const userDataDir = "./user-data-dir"; // Ajusta la ruta según tu preferencia
  
  // Start selenium driver with option --user-data-dir
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir=${userDataDir}`))
    .build();

  try {
    // Load excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("datos.xlsx");

  
    const worksheet = workbook.getWorksheet(1);

    
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const number = row.getCell(1).value; 
      const message = row.getCell(2).value; 

      await driver.get("https://web.whatsapp.com/");
      
      try {
        await driver.wait(until.elementLocated(By.css("._2vDPL")), 60000);
      } catch (error) {
        console.error("No se pudo cargar WhatsApp Web en el tiempo especificado.");
        continue;
      }

      console.log(`Enviando mensaje a ${number}: ${message}`);

      await driver.findElement(By.css("._2vDPL")).click();
      await driver.findElement(By.css("#side > div._3gYev > div > div._1EUay > div._2vDPL > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt.qh0vvdkp > p")).sendKeys(number, Key.RETURN);

      try {
        await driver.wait(until.elementLocated(By.css("#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p")), 10000);
      } catch (error) {
        console.error(`No se encontró el número ${number} en WhatsApp Web.`);
        row.getCell(5).value = "No encontrado en WhatsApp";
        continue; 
      }

      // send message
      await driver.findElement(By.css("#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p")).sendKeys(message, Key.RETURN);

      await driver.sleep(12000); // adjust time before sending another message
    }

  } catch (error) {
    console.error("Se produjo un error:", error);
  } finally {
    await driver.quit();
  }
}

main();
