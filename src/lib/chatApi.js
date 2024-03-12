const baseUrl = "wss://stage-moi.moi.salon/ws?user=";
let wsInstance;

const messageHandler = (event) => {
  const message = JSON.parse(event.data);
};

const closeHandler = (event) => {};

const errorHandler = (event) => {};

const createChannel = (userId) => {
  if (typeof window !== "undefined") {
    wsInstance = new WebSocket(`${baseUrl}${userId}`);
    wsInstance?.addEventListener("message", messageHandler);
    wsInstance?.addEventListener("close", closeHandler);
  }
};

export const chatApi = {
  start(userId) {
    createChannel(userId);
  },
  stop() {
    wsInstance?.removeEventListener("message", messageHandler);
    wsInstance?.removeEventListener("close", closeHandler);
    wsInstance?.close();
  },
};
