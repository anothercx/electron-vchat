import OpenAI from "openai";
import fsp from "fs/promises";
import fs from "fs"

import { qianfanApiKey, bailianApiKey } from "../apikey";

// 百度 千帆
async function baiduQianfanLLM() {
  try {
    const client = new OpenAI({
      apiKey: qianfanApiKey, // 替换示例中参数，将your_APIKey替换为真实值，如何获取API Key请查看：https://console.bce.baidu.com/iam/#/iam/apikey/list
      baseURL: "https://qianfan.baidubce.com/v2/", // 千帆ModelBuilder平台地址
    });
    const completion = await client.chat.completions.create({
      messages: [
        { role: "user", content: "什么是光合作用" },
        { role: "assistant", content: "如果您有任何问题, 请随时向我提问" },
        { role: "user", content: "我在上海，周末可以去哪里玩" },
      ],
      model: "ernie-speed-pro-128k", //模型对应的model值，请查看支持的模型列表：https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43
    });
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.log(`错误信息：${error}`);
  }
}

// 百度 千帆 Stream
async function baiduQianfanLLMStream() {
  try {
    const client = new OpenAI({
      apiKey: qianfanApiKey, // 替换示例中参数，将your_APIKey替换为真实值，如何获取API Key请查看：https://console.bce.baidu.com/iam/#/iam/apikey/list
      baseURL: "https://qianfan.baidubce.com/v2/", // 千帆ModelBuilder平台地址
    });
    const stream = await client.chat.completions.create({
      messages: [
        { role: "user", content: "什么是光合作用" },
        { role: "assistant", content: "如果您有任何问题, 请随时向我提问" },
        { role: "user", content: "我在上海，周末可以去哪里玩" },
      ],
      model: "ernie-speed-pro-128k", //模型对应的model值，请查看支持的模型列表：https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43
      stream: true,
    });
    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  } catch (error) {
    console.log(`错误信息：${error}`);
  }
}

// 阿里 百炼
async function aliBailianLLM() {
  try {
    const client = new OpenAI({
      // 若没有配置环境变量，请用阿里云百炼API Key将下行替换为: apiKey: "sk-xxx",
      // 新加坡和北京地域的API Key不同。获取API Key: https://help.aliyun.com/model-studio/get-api-key
      apiKey: bailianApiKey,
      // 以下是北京地域base_url，如果使用新加坡地域的模型，需要将base_url替换为: https://dashscope-intl.aliyuncs.com/compatible-mode/v1
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });
    const completion = await client.chat.completions.create({
      model: "qwen-turbo", //模型列表: https://help.aliyun.com/model-studio/getting-started/models
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "你是谁？" },
      ],
    });
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.log(`错误信息：${error}`);
    console.log(
      "请参考文档：https://help.aliyun.com/model-studio/developer-reference/error-code",
    );
  }
}

// 阿里 百炼 Stream
async function aliBailianLLMStream() {
  try {
    const client = new OpenAI({
      // 若没有配置环境变量，请用阿里云百炼API Key将下行替换为: apiKey: "sk-xxx",
      // 新加坡和北京地域的API Key不同。获取API Key: https://help.aliyun.com/model-studio/get-api-key
      apiKey: bailianApiKey,
      // 以下是北京地域base_url，如果使用新加坡地域的模型，需要将base_url替换为: https://dashscope-intl.aliyuncs.com/compatible-mode/v1
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });
    const stream = await client.chat.completions.create({
      model: "qwen-turbo", //模型列表: https://help.aliyun.com/model-studio/getting-started/models
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "你是谁？" },
      ],
      stream: true,
    });
    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  } catch (error) {
    console.log(`错误信息：${error}`);
    console.log(
      "请参考文档：https://help.aliyun.com/model-studio/developer-reference/error-code",
    );
  }
}

// 阿里 读图
async function aliBailianReadImage() {
  const imageBuffer = await fsp.readFile(
    "D:/Project/Electron_Projects/electron-vchat/src/files/test.png",
  );
  const base64Image = imageBuffer.toString("base64");

  const client = new OpenAI({
    // 若没有配置环境变量，请用阿里云百炼API Key将下行替换为: apiKey: "sk-xxx",
    // 新加坡和北京地域的API Key不同。获取API Key: https://help.aliyun.com/model-studio/get-api-key
    apiKey: bailianApiKey,
    // 以下是北京地域base_url，如果使用新加坡地域的模型，需要将base_url替换为: https://dashscope-intl.aliyuncs.com/compatible-mode/v1
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  });
  const completion = await client.chat.completions.create({
    messages: [{
      role: "user", content: [
        { type: 'text', text: '这是什么' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${base64Image}` } },
      ]
    }],
    model: "qwen-vl-plus", //模型对应的model值，请查看支持的模型列表：https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43
  });

  console.log(completion.choices[0].message.content);

}

// 阿里 读文件
async function aliBailianReadFile() {

  const client = new OpenAI({
    // 若没有配置环境变量，请用阿里云百炼API Key将下行替换为: apiKey: "sk-xxx",
    // 新加坡和北京地域的API Key不同。获取API Key: https://help.aliyun.com/model-studio/get-api-key
    apiKey: bailianApiKey,
    // 以下是北京地域base_url，如果使用新加坡地域的模型，需要将base_url替换为: https://dashscope-intl.aliyuncs.com/compatible-mode/v1
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  });

  const fileObj = await client.files.create({
    file: fs.createReadStream("D:/Project/Electron_Projects/electron-vchat/src/files/test.txt"),
    purpose: "file-extract" as any,
  });
  console.log(fileObj);
  const { id } = fileObj;

  const completion = await client.chat.completions.create({
    messages: [{
      role: "system", content: "you are a helpful assistant."
    },
    {
      role: "system", content: `fileid://${id}`
    },
    {
      role: 'user', content: "请帮忙概况文件说了什么"
    }
    ],
    model: "qwen-long", //模型对应的model值，请查看支持的模型列表：https://cloud.baidu.com/doc/qianfan-docs/s/7m95lyy43
  });

  console.log(completion.choices[0].message.content);


}
export {
  baiduQianfanLLM,
  baiduQianfanLLMStream,
  aliBailianLLM,
  aliBailianLLMStream,
  aliBailianReadImage,
  aliBailianReadFile
};
