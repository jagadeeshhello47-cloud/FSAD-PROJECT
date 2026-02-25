import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { setTheme, } from './features/theme/themeSlice';
import searchReducer from './features/search/searchSlice';
import selectedReducer, { fetchMFData } from './features/selected/selectedSlice';
import drawerReducer from './features/drawer/drawerSlice';
import roleReducer, { hydrateRoleState } from './features/role/roleSlice';
import platformReducer, { hydratePlatformState } from './features/platform/platformSlice';

const parseLocalStorageJSON = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === "selected/fetchMFData/pending" || 
    action.type === "selected/removeFund") {

    const selected = {
      schemeName: store.getState().selected.schemeName,
      schemeCode: store.getState().selected.schemeCode,
    };

    localStorage.setItem("selectedFund", JSON.stringify(selected));
  };

  if (action.type === "theme/switchTheme") {
    const theme = {
      mode: store.getState().theme.mode
    };

    localStorage.setItem("appTheme", JSON.stringify(theme));
  };

  if (action.type.startsWith("role/")) {
    const role = {
      currentRole: store.getState().role.currentRole
    };

    localStorage.setItem("appRole", JSON.stringify(role));
  };

  if (action.type.startsWith("platform/")) {
    const platform = store.getState().platform;
    localStorage.setItem("platformState", JSON.stringify(platform));
  };

  return result;
};

const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
    selected: selectedReducer,
    drawer: drawerReducer,
    role: roleReducer,
    platform: platformReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

const savedSelectedFund = parseLocalStorageJSON("selectedFund");
const savedAppTheme = parseLocalStorageJSON("appTheme");
const savedRole = parseLocalStorageJSON("appRole");
const savedPlatformState = parseLocalStorageJSON("platformState");

const presetFund = {
  schemeName: "HSBC Asia Pacific (Ex Japan) Dividend Yield Fund - Growth Direct",
  schemeCode: "127071"
};

store.dispatch(fetchMFData(savedSelectedFund || presetFund));

if (savedAppTheme) {
  store.dispatch(setTheme(savedAppTheme.mode));
};

if (savedRole) {
  store.dispatch(hydrateRoleState(savedRole));
};

if (savedPlatformState) {
  store.dispatch(hydratePlatformState(savedPlatformState));
};

export default store;
