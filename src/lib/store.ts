function createStore(reducer) {
    let state;
    const listeners = [];

    return {
        getState() {
            return state;
        },

        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener());
        },

        subscribe(listener) {
            listeners.push(listener);
            console.log(listener);

            return () => {
                const index = listeners.indexOf(listener);

                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };
        },
    };
}

// Example Reducer
function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        default:
            return state;
    }
}

const store = createStore(counterReducer);

const unsubscribe = store.subscribe(listener => {
    
    console.log('State changed: ', store.getState());
});
// (store.subscribe(() => {
    
// })())

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });

store.dispatch({ type: 'DECREMENT' });

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
