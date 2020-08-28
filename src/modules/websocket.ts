export const wsConnect = () => ({ type: 'WS_CONNECT' });
export const wsConnected = () => ({ type: 'WS_CONNECTED' });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsDisconnected = () => ({ type: 'WS_DISCONNECTED' });
export const sendWsMessage = () => ({ type: 'WS_DISCONNECTED' });
export const startNewGame = (data: any) => ({ type: 'NEW_GAME', data})
export const joinGame = (data: any) => ({ type: 'JOIN_GAME', data})
export const sendBoard = (data: any) => ({ type: 'SEND_BOARD', data})
export const attackEnemy = (data: any) => ({ type: 'ATTACK_ENEMY', data})
export const leaveGame = (data: any) => ({type: 'LEAVE_GAME', data})
