import config from '../config/index.js';
import { reply, push } from '../services/line.js';

const replyMessage = async ({
  replyToken,
  messages,
  event,
}) => {
  if (!messages || messages.length === 0) return;

  // 非 production：方便 debug
  if (config.APP_ENV !== 'production') {
    return { replyToken, messages };
  }

  // 第 1 則：reply（只能一次）
  await reply({
    replyToken,
    messages: [messages[0]],
  });

  // 剩下的：push
  const userId = event?.source?.userId;
  if (!userId) return;

  for (let i = 1; i < messages.length; i++) {
    await push({
      to: userId,
      messages: [messages[i]],
    });
  }
};

export default replyMessage;
