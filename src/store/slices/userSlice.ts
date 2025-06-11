import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersPayload {
    fromDate: string;
    toDate: string;
    role: string;

}

export interface UserRowData {
    firstName: string,
    latName: string,
    email: string,
    phoneNumber: string,
    role: string,
    createdDate: string

}

export interface UserData {
    openSliderUser: boolean;
    isSearchTriggered: boolean;
    filtersPayload: FiltersPayload;
    createSlider: boolean;
    UserEdit: boolean;
    debouncedSearchUser: string;
    rowUserData: UserRowData
}

const initialState: UserData = {
    rowUserData: {
        firstName: "",
        latName: "",
        email: "",
        phoneNumber: "",
        role: "",
        createdDate: ""
    },
    debouncedSearchUser: '',
    isSearchTriggered: false,
    openSliderUser: false,
    createSlider: false,
    UserEdit: false,
    filtersPayload: {
        fromDate: "",
        toDate: "",
        role: ''
    },
};

const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        setDebouncedSearchUser: (state, action: PayloadAction<string>) => {
            state.debouncedSearchUser = action.payload
        },
        setUserEdit: (state, action: PayloadAction<boolean>) => {
            state.UserEdit= action.payload
        },
        setCreateSliders: (state, action: PayloadAction<boolean>) => {
            state.createSlider = action.payload;
        },
        setOpenSliderUser: (state, action: PayloadAction<boolean>) => {
            state.openSliderUser= action.payload;
        },
        setIsSearchTriggered: (state, action: PayloadAction<boolean>) => {
            state.isSearchTriggered = action.payload;
        },
        setFiltersPayload: (state, action: PayloadAction<FiltersPayload>) => {
            state.filtersPayload = action.payload;
        },
        setRowUserData: (state, action: PayloadAction<UserRowData>) => {
            state.rowUserData = action.payload
        }
    },
});

export const { setIsSearchTriggered, setDebouncedSearchUser, setOpenSliderUser, setFiltersPayload, setCreateSliders, setUserEdit, setRowUserData } =
    UserSlice.actions;
export default UserSlice.reducer;
