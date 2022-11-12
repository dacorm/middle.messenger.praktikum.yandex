import { set } from '../shared/utils/set';
import EventBus from "../core/EventBus";
import Block from "../core/Block";
import {ComponentProps} from "../shared/interfaces";
import {Indexed, isDeepEqual} from "../shared/utils/isDeepEqual";

export enum StoreEvents {
    UPDATED = 'updated',
}

export interface UserData {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

interface LastMessage {
    time: string;
    content: string;
}

export interface ChatData {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
    unread_count: number;
    last_message: LastMessage;
}

interface StoreType {
    currentUser?: UserData;
    chatList?: ChatData[];
    currentChatId?: string;
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: keyof StoreType, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.UPDATED);
    }

    public clearUserInfo() {
        this.set('currentUser', {});
        this.set('chatList', []);
        this.set('currentChatId', '');
    }
}
export const store = new Store();

export const connect = (mapStateToProps: (state: StoreType) => Record<string, unknown>) => (Component: typeof Block) => {
    let state: Record<string, unknown>;

    return class extends Component {
        constructor(props: any) {
            state = mapStateToProps(store.getState() as StoreType);

            super({ ...props, ...state });

            store.on(StoreEvents.UPDATED, () => {
                const newState = mapStateToProps(store.getState() as StoreType);
                if (!isDeepEqual(state, newState)) {
                    this.setProps({ ...newState } as ComponentProps);
                }
            });
        }
    };
};