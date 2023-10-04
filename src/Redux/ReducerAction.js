import { ActionType } from "./ActionType";

export const authToken = (token) => {
    return {
        type: ActionType.TOKEN,
        payload: token,
    };
};
export const authTokenClear = () => {
    return {
        type: ActionType.TOKEN_CLEAR,
    };
};
export const userInfoAdd = (data) => {
    return {
        type: ActionType.USER_INFO,
        payload: data,
    };
};
export const userInfoClear = () => {
    return {
        type: ActionType.USER_INFO_CLEAR,
    };
};
export const sidebarOpenFn = () => {
    return {
        type: ActionType.SIDEBAR_OPEN,
    };
};
export const sidebarCloseFn = () => {
    return {
        type: ActionType.SIDEBAR_CLOSE,
    };
};

/* --------- Dark Mode Category ----------- */
export const darkModeFn = () => {
    return {
        type: ActionType.DARK_MODE,
    };
};

export const lightModeFn = () => {
    return {
        type: ActionType.LIGHT_MODE,
    };
};

/* --------- Spinner Overlay Category ----------- */
export const spinnerOverlayOnFn = () => {
    return {
        type: ActionType.SPINNER_OVERLAY_ON,
    };
};

export const spinnerOverlayOffFn = () => {
    return {
        type: ActionType.SPINNER_OVERLAY_OFF,
    };
};

/* --------- Product Category ----------- */
export const productCategoryDDindex = (index) => {
    return {
        type: ActionType.PRODUCT_CATEGORY_DD_IDX,
        payload: index,
    };
};
export const productCategoryNewSubCatAdd = (data) => {
    return {
        type: ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_ADD,
        payload: data,
    };
};
export const productCategoryNewSubCatRemove = (index) => {
    return {
        type: ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_REMOVE,
        payload: index,
    };
};
export const productCategoryNewSubCatClear = () => {
    return {
        type: ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_CLEAR,
    };
};
export const productCategoryNewSubCatClearAllAddArr = (arr) => {
    return {
        type: ActionType.PRODUCT_CATEGORY_NEW_SUBCAT_CLEAR_ALL_ADDARR,
        payload: arr,
    };
};

/* --------- Product Brand ----------- */

export const productBrandDDindex = (index) => {
    return {
        type: ActionType.PRODUCT_BRAND_DD_IDX,
        payload: index,
    };
};
export const productBrandNewArticleAdd = (data) => {
    return {
        type: ActionType.PRODUCT_BRAND_NEW_ARTICLE_ADD,
        payload: data,
    };
};
export const productBrandNewArticleRemove = (index) => {
    return {
        type: ActionType.PRODUCT_BRAND_NEW_ARTICLE_REMOVE,
        payload: index,
    };
};
export const productBrandNewArticleClear = () => {
    return {
        type: ActionType.PRODUCT_BRAND_NEW_ARTICLE_CLEAR,
    };
};
export const productBrandNewArticleClearAllAddArr = (arr) => {
    return {
        type: ActionType.PRODUCT_BRAND_NEW_ARTICLE_CLEAR_ALL_ADDARR,
        payload: arr,
    };
};

export const storeInfoAddFn = (data) => {
    return {
        type: ActionType.STORE_INFO_ADD,
        payload: data,
    };
};
export const storeInfoClearFn = () => {
    return {
        type: ActionType.STORE_INFO_CLEAR,
    };
};

export const categoryFilterAddFn = (data) => {
    return {
        type: ActionType.PRODUCT_FILTER_CATEGORY,
        payload: data,
    };
};
export const categoryFilterClearFn = () => {
    return {
        type: ActionType.PRODUCT_FILTER_CATEGORY_CLEAR,
    };
};
