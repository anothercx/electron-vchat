import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { CreateChatProps, UpdatgedStreamData } from "./types";
import OpenAI from "openai";
import { qianfanApiKey, bailianApiKey } from "../apikey";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 758,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("start-chat", async (event, data: CreateChatProps) => {
    const { providerName, content, messageId, selectedModel } = data;

    if (providerName === "qianfan") {
      const client = new OpenAI({
        apiKey: qianfanApiKey, // 替换示例中参数，将your_APIKey替换为真实值，如何获取API Key请查看：https://console.bce.baidu.com/iam/#/iam/apikey/list
        baseURL: "https://qianfan.baidubce.com/v2/", // 千帆ModelBuilder平台地址
      });

      const stream = await client.chat.completions.create({
        messages: [
          { role: "user", content: content },
        ],
        model: "ernie-speed-pro-128k", //模型对应的model值，请查看支持的模型列表：https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43
        stream: true,
      });

      for await (const chunk of stream) {
        const choice = chunk.choices[0]
        const is_end = choice.finish_reason === 'stop';
        const result = choice.delta.content || ''
        const content: UpdatgedStreamData = {
          messageId,
          data: {
            is_end,
            result
          }
        }

        mainWindow.webContents.send('update-message', content)
      }
    }
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
