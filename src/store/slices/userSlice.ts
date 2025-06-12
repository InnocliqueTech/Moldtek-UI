import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersPayload {
    fromDate: string;
    toDate: string;
    roles: number[];
    labelType: number[],
    email:string

}
export interface LabelType {
    labelTypeId: number;
    labelTypeName: string;
}


export interface UserRowData {
    firstName: string,
    latName: string,
    email: string,
    phoneNumber: string,
    role: string,
    createdDate: string,

}

export interface UserData {
    openSliderUser: boolean;
    isSearchTriggered: boolean;
    filtersPayload: FiltersPayload;
    createSlider: boolean;
    UserEdit: boolean;
    debouncedSearchUser: string;
    rowUserData: UserRowData;
    labelTypes: LabelType[];
    selectedLabelTypeIds: LabelType[];
    userSuccessPopup: boolean;
    userConfirmPopup: boolean;
}
const storedEmail = localStorage.getItem("email") || "";
console.log("storedEmail", storedEmail)

// const storedRoleType = localStorage.getItem("userId");
// const parsedRoleType = storedRoleType ? JSON.parse(storedRoleType) : [];
const initialState: UserData = {
    userSuccessPopup: false,
    userConfirmPopup: false,
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
        roles: [],
        labelType: [],
        email:storedEmail
    },
    labelTypes: [],
    selectedLabelTypeIds: [],
};

const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        setDebouncedSearchUser: (state, action: PayloadAction<string>) => {
            state.debouncedSearchUser = action.payload
        },
        setUserEdit: (state, action: PayloadAction<boolean>) => {
            state.UserEdit = action.payload
        },
        setCreateSliders: (state, action: PayloadAction<boolean>) => {
            state.createSlider = action.payload;
        },
        setOpenSliderUser: (state, action: PayloadAction<boolean>) => {
            state.openSliderUser = action.payload;
        },
        setIsSearchTriggered: (state, action: PayloadAction<boolean>) => {
            state.isSearchTriggered = action.payload;
        },
        setFiltersPayload: (state, action: PayloadAction<FiltersPayload>) => {
            state.filtersPayload = action.payload;
        },
        setRowUserData: (state, action: PayloadAction<UserRowData>) => {
            state.rowUserData = action.payload
        },
        setLabelTypes(state, action: PayloadAction<LabelType[]>) {
            state.labelTypes = action.payload;
        },
        setSelectedLabelTypeIds(state, action: PayloadAction<LabelType[]>) {
            state.selectedLabelTypeIds = action.payload;
        },
        toggleLabelType: (state, action: PayloadAction<LabelType>) => {
            const { labelTypeId } = action.payload;
            const exists = state.selectedLabelTypeIds.some((labelType) => labelType.labelTypeId === labelTypeId);
            if (exists) {
                state.selectedLabelTypeIds = state.selectedLabelTypeIds.filter(
                    (labelId) => labelId.labelTypeId !== labelTypeId
                );
            } else {
                state.selectedLabelTypeIds.push(action.payload);
            }
        },
        setUserSuccessPopup: (state, action: PayloadAction<boolean>) => {
            state.userSuccessPopup = action.payload
        },
        setUserConfirmPopup: (state, action: PayloadAction<boolean>) => {
            state.userConfirmPopup = action.payload;
        },
        setCreateSlider: (state, action: PayloadAction<boolean>) => {
            state.createSlider = action.payload;
        },
  

    },
});

export const {
    setIsSearchTriggered,
    setDebouncedSearchUser,
    setOpenSliderUser,
    setFiltersPayload,
    setCreateSliders,
    setUserEdit,
    setRowUserData,
    setLabelTypes,
    setSelectedLabelTypeIds,
    toggleLabelType, 
    setUserConfirmPopup,
    setUserSuccessPopup
} =
    UserSlice.actions;
export default UserSlice.reducer;
