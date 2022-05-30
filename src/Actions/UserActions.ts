import axios from "axios";
import { setNews, setProfile } from "../State/State";

export const getNews = async (setLoading: (x: boolean) => void, currentPage: number) => {
    setLoading(true);
    try {
        const result = await axios
            .get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${12}`)
        setNews(result?.data);
    }
    catch (err) {
        console.log(err);
    }
    setLoading(false);
};

export const getProfile = async (setLoading: (x: boolean) => void) => {
    setLoading(true);
    try {
        const result = await axios
            .get(`https://jsonplaceholder.typicode.com/users/1`)
        setProfile(result?.data);
    }
    catch (err) {
        console.log(err);
    }
    setLoading(false);
};
