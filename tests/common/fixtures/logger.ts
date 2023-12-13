import { TestInfo } from '@playwright/test';
import fs from 'fs';

export class Logger{

   private static readonly dir: string = './test-results/logs/';    
   private static createLogFileDir(){
    if(!fs.existsSync(this.dir)){
        fs.mkdirSync(this.dir)
      }
    }

    static async addLogs(testInfo:TestInfo,logs:String[]){
    // After the test we can check whether the test passed or failed.
    this.createLogFileDir()
    let logFileName = testInfo.title + '_' + testInfo.testId + '.log'    
    let logFile = this.dir + logFileName
    await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
    testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
    }

}   