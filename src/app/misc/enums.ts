export const CHECK_TYPE = {
    check: 'CHECK',
    shirt: 'SHIRT',
    lucky: 'LUCKY'
};

export const CHECK_CONFIG = {
    [CHECK_TYPE.check]: {
        type: CHECK_TYPE.check,
        lblYes: 'IN',
        boolKey: 'isGotCheck'
    },
    [CHECK_TYPE.shirt]: {
        type: CHECK_TYPE.shirt,
        lblYes: 'GIVE',
        boolKey: 'isGotShirt'
    },
    [CHECK_TYPE.lucky]: {
        type: CHECK_TYPE.lucky,
        lblYes: 'LUCK',
        boolKey: 'isGotLucky'
    }
};

export const CHECK_STATUS = {
    FOUND: 'found',
    NOT_FOUND: 'record not found!',
    ERROR: 'error',
    SHIRT_GIVEN: 'already give shirt!',
    SHIRT_NOT_GIVEN: 'hv nt give shirt yet!',
    CHECK_GIVEN: 'already check in!',
    CHECK_NOT_GIVEN: 'hv nt check in yet!',
    LUCKY_GIVEN: 'already enter draw!',
    LUCKY_NOT_GIVEN: 'hv nt enter draw yet!'
};

export const SESSION_KEY = {
    USER: 'ioxkl.mgr.user',
    PAIR: 'ioxkl.mgr.pair' // follow queue
};

export const ACCESS_LIST = [
    { key: 'CHECK', value: 'Check-in' },
    { key: 'BADGE', value: 'Badge distribution' },
    { key: 'SHIRT', value: 'Goodies' },
    { key: 'LUCKY', value: 'Lucky draw' },
    { key: 'SEARCH', value: 'Search badge by name' },
    { key: 'GRANT', value: 'Grant user rights' },
    { key: 'RIGHTS', value: 'Manage user rights'},
    { key: 'LOAD', value: 'Load data' },
    { key: 'DASHBOARD', value: 'Live data' }
];

