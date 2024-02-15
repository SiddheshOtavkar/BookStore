import { useState, useEffect } from "react";
import axios from "axios";

export default function useSemester() {
    const [semesters, setSemesters] = useState([]);

    //get semesters
    const getSemesters = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/semester/get-semester`);
            setSemesters(data?.semester);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSemesters();
    }, []);

    return semesters;
}