import { TestInfo } from '@playwright/test';
import fs from 'fs';

export class Utility {

   private static readonly dir: string = './test-results/logs/';
   private static createLogFileDir() {
      if (!fs.existsSync(this.dir)) {
         fs.mkdirSync(this.dir)
      }
   }

   static async addLogs(testInfo: TestInfo, logs: String[]) {
      // After the test we can check whether the test passed or failed.
      this.createLogFileDir()
      let logFileName = testInfo.title + '_' + testInfo.testId + '.log'
      let logFile = this.dir + logFileName
      await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
      testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
   }

   // The function returns next upcoming date given the array of date strings
   static async getUpcomingForecastSubmissionDate(strdates: string[]) {

      //convert string to Date type
      let dates = strdates.map(dateString => new Date(dateString));

      //current date
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      //removing the past dates
      const futureDates = dates.filter(date => date >= currentDate);

      //sorting the dates in ascending order and return the first date
      futureDates.sort((dt1, dt2) => dt1.getDate() - dt2.getDate());
      return futureDates[0];

   }

}   