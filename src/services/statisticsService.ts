import { BACKURL } from "../api/backConf";
import { handleResponse } from "./utils/handleResponse";
import { getAuthHeaders } from "./utils/headers";


export const statisticsService = {
   async getStatistics() {
     const res = await fetch(
       `${BACKURL}/api/statistics`,
       { headers: getAuthHeaders() }
     );
     return handleResponse(res);
   },
 
};
