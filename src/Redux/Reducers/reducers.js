import { ActionType } from "../ActionType";

export const tokenReducer = (state = "", action) => {
    switch (action.type) {
        case ActionType.TOKEN:
            state = action.payload;
            return state;
        case ActionType.TOKEN_CLEAR:
            state = "";
            return state;
        default:
            return state;
    }
};
export const userInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.USER_INFO:
            state = action.payload;
            return state;
        case ActionType.USER_INFO_CLEAR:
            state = {};
            return state;
        default:
            return state;
    }
};

export const sidebarCollapse = (state = false, action) => {
    switch (action.type) {
        case ActionType.SIDEBAR_OPEN:
            state = false;
            return state;
        case ActionType.SIDEBAR_CLOSE:
            state = true;
            return state;
        default:
            return state;
    }
};
export const darkModeReducer = (state = false, action) => {
    switch (action.type) {
        case ActionType.DARK_MODE:
            state = true;
            return state;

        case ActionType.LIGHT_MODE:
            state = false;
            return state;
        default:
            return state;
    }
};
export const spinnerOverlayReducer = (state = false, action) => {
    switch (action.type) {
        case ActionType.SPINNER_OVERLAY_ON:
            state = true;
            return state;
        case ActionType.SPINNER_OVERLAY_OFF:
            state = false;
            return state;
        default:
            return state;
    }
};

export const productCategoryNewReducer = (state = [], action) => {
    let arr;
    switch (action.type) {
        case ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_ADD:
            arr = [...state, action.payload];
            return arr;
        case ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_REMOVE:
            arr = [...state];
            arr.splice(action.payload, 1);
            return arr;
        case ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_CLEAR_ALL_ADDARR:
            state = [];
            arr = action.payload;
            return arr;
        case ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_CLEAR:
            arr = [];
            return arr;
        default:
            return state;
    }
};
export const productCategoryDDindexReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.PRODUCT_CATEGORY_DD_IDX:
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export const productBrandNewReducer = (state = [], action) => {
    let arr;
    switch (action.type) {
        case ActionType.PRODUCT_BRAND_NEW_ARTICLE_ADD:
            arr = [...state, action.payload];
            return arr;
        case ActionType.PRODUCT_BRAND_NEW_ARTICLE_REMOVE:
            arr = [...state];
            arr.splice(action.payload, 1);
            return arr;
        case ActionType.PRODUCT_BRAND_NEW_ARTICLE_CLEAR_ALL_ADDARR:
            state = [];
            arr = action.payload;
            return arr;
        case ActionType.PRODUCT_BRAND_NEW_ARTICLE_CLEAR:
            arr = [];
            return arr;
        default:
            return state;
    }
};
export const productBrandDDindexReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.PRODUCT_BRAND_DD_IDX:
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export const storeInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionType.STORE_INFO_ADD:
            state = action.payload;
            return state;
        case ActionType.STORE_INFO_CLEAR:
            state = {};
            return state;
        default:
            return state;
    }
};
