import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, name: 'Priya Sharma', role: 'Investor', active: true, engagement: 78 },
    { id: 2, name: 'Arjun Mehta', role: 'Financial Advisor', active: true, engagement: 84 },
    { id: 3, name: 'Neha Verma', role: 'Data Analyst', active: true, engagement: 71 },
    { id: 4, name: 'Rohan Singh', role: 'Investor', active: false, engagement: 43 },
  ],
  activities: [
    { id: 1, message: 'Initial platform setup completed', createdAt: new Date().toISOString() },
  ],
  adminContentUpdates: [
    {
      id: 1,
      title: 'Monthly Fund Education Bulletin',
      summary: 'Overview of equity vs debt allocation considerations.',
      published: true,
      createdAt: new Date().toISOString(),
    },
  ],
  advisorArticles: [
    {
      id: 1,
      title: 'How to align SIP with risk appetite',
      summary: 'Choose fund categories based on horizon and volatility tolerance.',
      published: true,
      createdAt: new Date().toISOString(),
    },
  ],
  investorWatchlist: [],
  analystReports: [],
};

const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    adminToggleUserStatus: (state, action) => {
      const user = state.users.find((item) => item.id === action.payload);
      if (user) {
        user.active = !user.active;
      }
    },
    adminAddContentUpdate: (state, action) => {
      const { title, summary } = action.payload;
      if (!title || !summary) return;

      state.adminContentUpdates.unshift({
        id: Date.now(),
        title,
        summary,
        published: false,
        createdAt: new Date().toISOString(),
      });
    },
    adminToggleContentPublish: (state, action) => {
      const item = state.adminContentUpdates.find((entry) => entry.id === action.payload);
      if (item) {
        item.published = !item.published;
      }
    },
    advisorAddArticle: (state, action) => {
      const { title, summary } = action.payload;
      if (!title || !summary) return;

      state.advisorArticles.unshift({
        id: Date.now(),
        title,
        summary,
        published: false,
        createdAt: new Date().toISOString(),
      });
    },
    advisorToggleArticlePublish: (state, action) => {
      const article = state.advisorArticles.find((entry) => entry.id === action.payload);
      if (article) {
        article.published = !article.published;
      }
    },
    investorAddToWatchlist: (state, action) => {
      const { schemeCode, schemeName } = action.payload;
      if (!schemeCode || !schemeName) return;

      const exists = state.investorWatchlist.some((item) => item.schemeCode === schemeCode);
      if (!exists) {
        state.investorWatchlist.unshift({
          schemeCode,
          schemeName,
          addedAt: new Date().toISOString(),
        });
      }
    },
    investorRemoveFromWatchlist: (state, action) => {
      state.investorWatchlist = state.investorWatchlist.filter(
        (item) => item.schemeCode !== action.payload
      );
    },
    analystAddReport: (state, action) => {
      const { title, summary } = action.payload;
      if (!title || !summary) return;

      state.analystReports.unshift({
        id: Date.now(),
        title,
        summary,
        createdAt: new Date().toISOString(),
      });
    },
    logPlatformActivity: (state, action) => {
      state.activities.unshift({
        id: Date.now(),
        message: action.payload,
        createdAt: new Date().toISOString(),
      });
      state.activities = state.activities.slice(0, 20);
    },
    hydratePlatformState: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const getPlatformUsers = (store) => store.platform.users;
export const getPlatformActivities = (store) => store.platform.activities;
export const getAdminContentUpdates = (store) => store.platform.adminContentUpdates;
export const getAdvisorArticles = (store) => store.platform.advisorArticles;
export const getInvestorWatchlist = (store) => store.platform.investorWatchlist;
export const getAnalystReports = (store) => store.platform.analystReports;

export const {
  adminToggleUserStatus,
  adminAddContentUpdate,
  adminToggleContentPublish,
  advisorAddArticle,
  advisorToggleArticlePublish,
  investorAddToWatchlist,
  investorRemoveFromWatchlist,
  analystAddReport,
  logPlatformActivity,
  hydratePlatformState,
} = platformSlice.actions;

export default platformSlice.reducer;
