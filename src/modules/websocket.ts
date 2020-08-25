export const wsConnect = () => ({ type: 'WS_CONNECT' });
export const wsConnected = () => ({ type: 'WS_CONNECTED' });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsDisconnected = () => ({ type: 'WS_DISCONNECTED' });
export const sendWsMessage = () => ({ type: 'WS_DISCONNECTED' });
export const startNewGame = (data: any) => ({ type: 'NEW_GAME', data})