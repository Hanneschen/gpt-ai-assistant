export const replyMessage = async (context) => {
  const { client } = context;
  const { replyToken, messages, event } = context;

  if (!messages || messages.length === 0) return;

  // 第 1 則：reply（只能一次）
  await client.replyMessage(replyToken, messages[0]);

  // 剩下的：push（補完全文）
  for (let i = 1; i < messages.length; i++) {
    await client.pushMessage(event.source.userId, messages[i]);
  }
};
