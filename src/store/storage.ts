export function loadState(subs: string[]) {
    try {
        const jsonState = localStorage.getItem(subs[0]);
        if (!jsonState) return undefined;
        return JSON.parse(jsonState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

export function saveState<T>(state: T, subs: string[]) {
    const stringState = JSON.stringify(state);
    localStorage.setItem(subs[0], stringState);
}
