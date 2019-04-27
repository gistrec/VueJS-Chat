import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();

/**
 * Хранилище - контейнер, в котором хранится состояние приложения
 * ! Хранилище Vuex реактивно - компоненты будут обновляться, если состояние хранилища изменяется.
 * ! Единственный способ внести изменения - явно вызвать мутацию
 */
const store = new Vuex.Store({
    state: {
        // Текущий пользователь
        user: {
            name: 'Ира',
            img: 'dist/images/1.jpg'
        },
        // Список диалогов
        sessions: [
            {
                id: 1,
                user: {
                    name: 'Рома',
                    img: 'dist/images/2.png'
                },
                messages: [
                    {
                        content: 'Хэй, привет, бро!',
                        date: new Date()
                    }, {
                        content: 'Ты чего не отвечаешь?',
                        date: new Date()
                    }
                ]
            },
            {
                id: 2,
                user: {
                    name: 'Саша',
                    img: 'dist/images/3.jpg'
                },
                messages: [
                    {
                        content: 'Привет!',
                        date: new Date()
                    }
                ]
            }
        ],
        // Выбранный диалог
        currentSessionId: 1,
        // Показывать даилоги, которые содержат эту строку
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // Отправить сообщение
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        // Выбрать диалог
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } ,
        // Поиск диалога по фильтру
        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
export const actions = {
    initData:      ({ dispatch })          => dispatch('INIT_DATA'),             // Инициализация данных
    sendMessage:   ({ dispatch }, content) => dispatch('SEND_MESSAGE', content), // Отправка сообщения
    selectSession: ({ dispatch }, id)      => dispatch('SELECT_SESSION', id),    // Выбор диалога
    search:        ({ dispatch }, value)   => dispatch('SET_FILTER_KEY', value)  // Поиск диалога по логину
};
