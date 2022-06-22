import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    db: {
        '001': {
            firstName: 'Jack',
            lastName: 'Li',
            phoneNumber: '347-476-4944',
            emailAddress: 'Jack7598@gmail.com',
        },
        '002': {
            firstName: 'Max',
            lastName: 'Mayfield',
            phoneNumber: '212-004-2002',
            emailAddress: 'maxMayfield@strangerThings.com',
            icon: { art: 'star', title: 'favorite contact' },
        },
        '003': {
            firstName: 'Mike',
            lastName: 'Wheeler',
            phoneNumber: '212-012-2002',
            emailAddress: 'mike@strangerThings.com',
            icon: { art: 'eco', title: 'new contact' },
        },
        '004': {
            firstName: 'VISA',
            lastName: '',
            phoneNumber: '1-800-847-2911',
            emailAddress: 'contact@visa.com',
            icon: { art: 'store', title: 'verified business' },
        },
        '005': {
            firstName: 'Placeholder',
            lastName: 'Value',
            phoneNumber: '000-000-0000',
            emailAddress: 'placeholder@value.com',
        },
        '006': {
            firstName: 'Nancy',
            lastName: 'Wheeler',
            phoneNumber: '212-001-1995',
            emailAddress: 'nancyw@strangerThings.com',
            icon: { art: 'emergency', title: 'emergency contact' },
        },
        '007': {
            firstName: 'NYPD',
            lastName: '(Emergency)',
            phoneNumber: '646-610-5000',
            emailAddress: 'hctf@nypd.org',
            icon: { art: 'emergency', title: 'emergency contact' },
        },
    },
    fixed: {
        me: {
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '123-456-7890',
            emailAddress: 'John@email.com',
        },
        demo: {
            firstName: 'Jane',
            lastName: 'Doe',
            phoneNumber: '321-654-0987',
            emailAddress: 'jane@email.com',
        },
    },
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        add: {
            reducer(state, action) { state.db[nanoid()] = action.payload; },
            prepare(data) {
                const payload = data.data;
                payload.icon = { art: 'eco', title: 'new' };
                return { payload };
            },
        },
        edit(state, action) {
            const { id, data, custom = false } = action.payload;

            if (custom) { state.fixed[id] = data; }
            else {
                if (!state.db[id]) { throw new Error(`Editing Failed, contact with id of ${id} does not exist!`); }
                state.db[id] = data;
            }
        },
        del(state, action) {
            const { id, custom = false } = action.payload;

            if (custom) { delete state.fixed[id]; }
            else {
                if (!state.db[id]) { throw new Error(`Delete failed, contact with id of ${id} does not exist!`); }
                delete state.db[id];
            }
        },
        resetDemo(state) {
            state.fixed.demo = {
                firstName: 'Jane',
                lastName: 'Doe',
                phoneNumber: '321-654-0987',
                emailAddress: 'jane@email.com',
            }
        }
    },
});

export const { add, edit, del, resetDemo } = contactsSlice.actions;
export default contactsSlice.reducer;
