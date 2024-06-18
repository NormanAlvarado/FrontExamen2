import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function useGetDate(startDate, endDate) {

    const [fechas, setFechas] = useState([])

    useEffect(() => {

        if (startDate && endDate) {
          async function getDataDateRange() {
            const response = await axios.get(`https://localhost:7088/api/Tickets/travelers-date?start=${startDate}&finish=${endDate}`);
            if (response.status == 200) {
              setFechas(response.data);
            }
          }
          getDataDateRange();
        }
    
      }, [startDate, endDate])

  return { fechas }
}

export default useGetDate