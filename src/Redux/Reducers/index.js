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
   spinnerOverlayReducer
} from './reducers';

export default combineReducers({
   tokenReducer,
   userInfoReducer,
   sidebarCollapse,
   darkModeReducer, 
   productCategoryDDindexReducer, 
   productCategoryNewReducer,
   productBrandNewReducer,
   productBrandDDindexReducer,
   spinnerOverlayReducer
})