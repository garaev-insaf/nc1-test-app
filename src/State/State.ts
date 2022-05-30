import { NewsType, ProfileType } from './../static/types/types';
import { createGlobalState } from 'react-hooks-global-state';

const initialNewsState: NewsType[] | [] = [];
const initialProfileState: ProfileType = {
  id: null,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: ""
    }
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: ""
  }
}

const { setGlobalState, useGlobalState } = createGlobalState({
  news: initialNewsState,
  profile: initialProfileState,
});

export const setNews = (newsList: React.SetStateAction<[] | NewsType[]>) => {
  setGlobalState('news', newsList);
};

export const setProfile = (profile: React.SetStateAction<ProfileType>) => {
  setGlobalState('profile', profile);
};

export { useGlobalState };