import axios from "axios";
import mainAxios from "../axios/mainAxios"

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

// export const getOrders = async (searchParams: any, userKey: string) => {
//     const token = {
//         headers: { 'authorization': userKey }
//     };
//     try {
//         const { data } = await axios.get("http://localhost:3500/northwind/orders", token);
//         return data;
//     } catch (ex) {
//         return []
//     }
// }

export const getOrders = async (searchParams: any) => {
    try {
        const { payment, ship } = searchParams
        const { data } = await mainAxios.get(`/northwind/orders?paymenttype=${payment}&shipcity=${ship}`)
        return data;
    } catch (ex) {
        return []
    }
}

export const getCostumers = async (nameObj: any) => {
    const { first_name, last_name } = nameObj
    try {
        const { data } = await mainAxios.get(`/northwind/costumers?firstname=${first_name}&lastname=${last_name}`)
        return data;
    } catch (ex) {
        return []
    }
}

export const getOrdersHeaders = async () => {
    try {
        const { data } = await mainAxios.get("/northwind/ordersheaders")
        return data;
    } catch (ex) {
        return {}
    }
}

export const getVerifyService = async () => {
    try {
        const { data } = await mainAxios.get("/auth/verify")
        return data;
    } catch (ex) {
        return []
    }
}

