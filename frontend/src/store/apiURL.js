
 
export const getApiURL =  (route) => import.meta.env.PROD ? route : `http://localhost:5000${route}`;