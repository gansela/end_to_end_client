import axios from "axios";

export const registerService = async (user: any) => {
    try {
        const { data } = await axios.post("http://localhost:3500/auth/signin", user);
        return data;
    } catch (ex) {
        return []
    }

}

export const logInService = async (logInUser: any) => {
    try {
        const { data } = await axios.post("http://localhost:3500/auth/login", logInUser);
        return data;
    } catch (ex) {
        return []
    }

}

export const cahngePasswordService = async (user: any) => {
    try {
        const { data } = await axios.post("http://localhost:3500/auth/changepassword", user);
        return data;
    } catch (ex) {
        return []
    }

}

export const getOrders = async (searchParams: any, userKey: string) => {
    const token = {
        headers: { 'authorization': userKey }
    };
    try {
        const { data } = await axios.get("http://localhost:3500/northwind/orders", token);
        return data;
    } catch (ex) {
        return []
    }
}