
// @TODO
// CREATE MODULES FOR:
// - USER
// - USER SETTINGS
// - GRATITUDES

import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '@/services/firebaseConfigTypeScript';
import { User } from '@/interfaces/user';
import { IGratitude } from '@/interfaces/gratitude';

Vue.use(Vuex);

// interface User {

// }

export default new Vuex.Store({
  state: {
    gratitudes: [],
    defaultColors: [],
    userLocation: {} as object,
    user: {} as object,
    currentWeather: {} as object,
    currentCity: {} as object,
    selectedGratitude: {} as IGratitude,
    originalGratitude: {} as IGratitude, // Use this as a cache for reverting edits on a Gratitude
    menuState: false,
    parentLinks: [],
    parentCategories: [],
    prepSchoolCategories: [],
    middleSchoolCategories: [],
    mainCategories: []
  },

  mutations: {
    ...vuexfireMutations,
    SET_USER_LOCATION: (state: any, location: object) => {
      state.userLocation = location;
    },

    SET_USER: (state: any, user: object) => {
      state.user = user;
    },

    SET_CURRENT_WEATHER: (state: any, weather: object) => {
      state.currentWeather = weather;
    },

    SET_CURRENT_CITY: (state: any, weather: object) => {
      state.currentCity = weather;
    },

    SET_SELECTED_GRATITUDE: (state: any, gratitude: IGratitude) => {
      state.selectedGratitude = gratitude;
      state.originalGratitude = {...gratitude};
    },

    RESET_SELECTED_GRATITUDE: (state: any) => {
      state.selectedGratitude = {...state.originalGratitude};
    },

    UPDATE_SELECTED_GRATITUDE: (state: any) => {
      console.log('updated');
    },

    SET_MENU_STATE: (state: any, payload: boolean) => {
      state.menuState = payload;
    }
  },

  actions: {
    bindGratitudes: firestoreAction(({ bindFirestoreRef }, ref) => {
      const { reference, userID } = ref;
      return bindFirestoreRef('gratitudes', db.collection('users').doc(userID).collection('gratitudes'));
    }),

    bindDefaultColors: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('defaultColors', db.collection('settings').doc('colors').collection('items'));
    }),


    setUserLocation: (context: any, location: any) => {
      context.commit('SET_USER_LOCATION', { latitude: location.coords.latitude, longitude: location.coords.longitude });
    },

    setUser: (context: any, user: any) => {
      context.commit('SET_USER', user);
    },

    setCurrentWeather: (context: any, weather: object) => {
      context.commit('SET_CURRENT_WEATHER', weather);
    },

    setCurrentCity: (context: any, data: object) => {
      const { commit } = context;
      commit('SET_CURRENT_CITY', data);
    },

    setSelectedGratitude: (context: any, id: string) => {
      const { state } = context;
      const user = state.user as User;
      const ref = db.collection('users').doc(user.uid).collection('gratitudes').doc(id);

      return ref.get();
    },

    deleteGratitude: (context: any, id: string) => {
      const { commit, state } = context;
      const user = state.user as User;

      const ref = db.collection('users').doc(user.uid).collection('gratitudes').doc(id);

      return ref.delete();
    },

    getColorData: (context: any) => {
      const ref = db.collection('setting').doc('colors').collection('items');

      return ref.get();
    },

    getAllData: (context: any) => {
      const ref = db.collection('categories').doc('parents').collection('categories').get().then((categoriesResponse: any) => {
        context.state.parentsCategories = categoriesResponse;
        db.collection('categories').doc('parents').collection('links').get().then((linksResponse) => {
          context.state.parentsLinks = linksResponse;
        }).catch((e) => {
          console.log(e);
        });
      });

      return ref;
    },

    bindMainCategories: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('mainCategories', db.collection('categories'));
    }),

    bindParentCategories: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('parentCategories', db.collection('categories').doc('parents').collection('categories'));
    }),

    bindPrepSchoolCategories: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('prepSchoolCategories', db.collection('categories').doc('prepschool').collection('categories'));
    }),

    bindMiddleSchoolCategories: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('middleSchoolCategories', db.collection('categories').doc('middleschool').collection('categories'));
    }),

    bindParentLinks: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('parentLinks', db.collection('categories').doc('parents').collection('links'));
    }),

    bindPrepSchoolLinks: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('prepSchoolLinks', db.collection('categories').doc('prepschool').collection('links'));
    }),

    bindMiddleSchoolLinks: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('middleSchoolLinks', db.collection('categories').doc('middleschool').collection('links'));
    }),

    addLink: (context: any, payload: any) => {
      const ref = db.collection('categories').doc(payload.mainCategory).collection('links');
      return ref.add(payload);
    },

    addSubCategory: (context: any, payload: any) => {
      console.log(payload);
      const ref = db.collection('categories').doc(payload.mainCategory).collection('categories');
      return ref.add(payload.item);
    },


    getAllDataAgain: (context: any) => {
      const ref = db.collection('categories');

      return ref.get();
    },



    updateSelectedGratitude: (context: any, gratitudeObject: any) => {
      const { commit, state } = context;
      const {id, payload} = gratitudeObject;
      const user = state.user as User;
      const ref = db.collection('users').doc(user.uid).collection('gratitudes').doc(id);

      state.selectedGratitude = {...payload};
      state.originalGratitude = {...payload};

      return ref.update(payload);
    },

    setMenuState: (context: any, payload: boolean) => {
      const { commit, state } = context;
      commit('SET_MENU_STATE', payload);
    }
  },

  getters: {
    getMainCategories: (state: any) => state.mainCategories,
    getParentCategories: (state: any) => state.parentCategories,
    getPrepSchoolCategories: (state: any) => state.prepSchoolCategories,
    getMiddleSchoolCategories: (state: any) => state.middleSchoolCategories,
    getParentLinks: (state: any) => state.parentLinks,
    getPrepSchoolLinks: (state: any) => state.prepSchoolLinks,
    getMiddleSchoolLinks: (state: any) => state.middleSchoolLinks,

    getGratitudes: (state: any) => {
      return state.gratitudes;
    },

    location: (state: any) => {
      return state.userLocation;
    },

    currentWeather: (state: any) => {
      return state.currentWeather;
    },

    currentCity: (state: any) => {
      return state.currentCity;
    },

    user: (state: any) => {
      return state.user;
    },

    defaultColors: (state: any) => {
      return state.defaultColors;
    },

    selectedGratitude: (state: any) => {
      return state.selectedGratitude;
    },

    menuState: (state: any) => {
      return state.menuState;
    }
  }
});
