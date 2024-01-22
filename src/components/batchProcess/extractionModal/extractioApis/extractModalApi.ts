import axios from "axios";
//Attention: Check the path below and change it if required

export const Extractionbydateapi = (state: any, companyId: number) => {
  // Attention : Check and update the below API, if required
  return axios.post(
    `http://localhost:3000/api/v1/nbservices/extractpabill/${state.effectiveDate}`,
    {},
    {
      withCredentials: true,
    }
  );
};

// export const getBusinessDateApi = (companyId: number, userId: number) => {
//   return axios.get(
//     `http://localhost:3000/api/v1/basicservices/compbusinessdateget/${companyId}/00/${userId}`,
//     {
//       withCredentials: true,
//     }
//   );
// };

//Receipt by Bank
//`http://localhost:3000/api/v1/batchservices/bnkrcptcreate`,
