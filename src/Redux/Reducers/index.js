import { combineReducers } from "redux";

import {
    tokenReducer,
    userInfoReducer,
    sidebarCollapse,
    darkModeReducer,
    productCategoryNewReducer,
    productCategoryDDindexReducer,
    productBrandNewReducer,
    productBrandDDindexReducer,
    spinnerOverlayReducer,
    storeInfoReducer,
} from "./reducers";

export default combineReducers({
    tokenReducer,
    userInfoReducer,
    sidebarCollapse,
    darkModeReducer,
    productCategoryDDindexReducer,
    productCategoryNewReducer,
    productBrandNewReducer,
    productBrandDDindexReducer,
    spinnerOverlayReducer,
    storeInfoReducer,
});
