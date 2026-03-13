import axios from "axios"



export const getBanks = async () => {
    const res = await axios.get('https://api.vietqr.io/v2/banks');
    return res.data.data
}