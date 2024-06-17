import { useEffect, useState } from "react"
import api from "../api/config";

function useGetMenu() {
    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      async function GetMenu() {
        setIsLoading(true)
        const response = await api.get("menu");
        setMenu(response.data);
        setIsLoading(false)
      }
      GetMenu()
    }, [])
    


  return {menu, isLoading}
}

export default useGetMenu
