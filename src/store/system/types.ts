export const UPDATE_SESSION = "UPDATE_SESSION";

export interface SystemState {
    session: string,
    username: string;
    loggedIn: boolean,
}

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction;