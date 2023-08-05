import axios from "../api/axios";

export async function signIn(params: any) {
  try {
    const response = await axios.post("/auth/login", params, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message || "Server side error");
    }
  }
}

export async function signOut() {
  try {
    const response = await axios.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message || "Server side error");
    }
  }
}

function handleErrors(error: any) {
  console.log(error.response.data);
  if (error.response) {
    if (error.response.status === 401) {
      throw new Error(error.response.status + "_" + "token_expired");
    }
    if (error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.response.status + "_" + error.response.message);
    }
  } else {
    throw new Error(error.message || "Server side error");
  }
}

/*
function handleErrors1 (ok ,status , data)

{

  if (!ok) {
    if(data.status && data.status === 'ERROR')
        {
          throw new Error(data.body);  
        }
        else
        {
          
          if(status=== 401 && data.error ==='Unauthorized' && data.message !=="Bad-Credentials"  )
          {
            throw new Error(status+"_"+"token_expired");  
          } 
          else
          {
            throw new Error(status+"-"+data.error);
          }
        
         
        }
   }

   if (ok && data.status === 'ERROR')
   {
    throw new Error(data.body);
   } 

}
*/

export async function getData(params: any) {
  const { apiUrlPathSuffix, getDataParams } = params;

  const urlparams = new URLSearchParams([]);

  Object.keys(getDataParams).forEach((key) =>
    urlparams.append(key, getDataParams[key])
  );

  try {
    const response = await axios.get(apiUrlPathSuffix, {
      params: urlparams,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    handleErrors(error);
  }
}

export async function modData(params: any) {
  const { apiUrlPathSuffix, getDataParams, requestBody, mode } = params;

  try {
    if (mode === "update") {
      const response = await axios.put(apiUrlPathSuffix, requestBody, {
        withCredentials: true,
      });

      return response.data;
    }

    if (mode === "create") {
      const response = await axios.post(apiUrlPathSuffix, requestBody, {
        withCredentials: true,
      });

      return response.data;
    }

    if (mode === "delete") {
      const urlparams = new URLSearchParams([]);
      Object.keys(getDataParams).forEach((key) =>
        urlparams.append(key, getDataParams[key])
      );

      const response = await axios.delete(apiUrlPathSuffix, {
        params: urlparams,
        withCredentials: true,
      });

      return response.data;
    }
  } catch (error) {
    handleErrors(error);
  }
}
