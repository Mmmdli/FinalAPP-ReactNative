
import { View, Text } from 'react-native';
import {useState,useEffect} from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

const fetchData = async () => {
    setIsLoading(true)

    try {
        const response = await axios.get('http://172.16.0.35:3000/api/products')
        setData(response.data)
        console.log("okay",response.data)
        setIsLoading(false)
    } catch (error) {
        console.log("error")

       setError(error)
       setIsLoading(false)
    } finally {
        setIsLoading(false)
    }
}

useEffect(()=> {
    fetchData()
}, []);

const refetch = () => {
    setIsLoading(true)
    fetchData();
}

  return {data, isLoading, error, refetch}
}

export default useFetch