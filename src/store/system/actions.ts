import { SystemState, UPDATE_SESSION } from './types';

export function updateSession(newSession: SystemState) {
    return {
        payload: newSession,
        type: UPDATE_SESSION,
    };
}