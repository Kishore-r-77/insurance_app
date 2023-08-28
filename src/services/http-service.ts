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
  const { apiUrlPathSuffix, getDataParams, isBlob } = params;

  const urlparams = new URLSearchParams([]);

  Object.keys(getDataParams).forEach((key) =>
    urlparams.append(key, getDataParams[key])
  );

  let options: any = null;
  if (isBlob) {
    options = {
      params: urlparams,
      withCredentials: true,
      responseType: "blob",
    };
  } else {
    options = {
      params: urlparams,
      withCredentials: true,
    };
  }

  try {
    const response = await axios.get(apiUrlPathSuffix, options);

    if(isBlob)
    {
      return response
    }
    else
    {
    return response.data;
    }
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



export async function uploadFiles(params: any) {
  const { apiUrlPathSuffix, getDataParams, files } = params;

  try {
    const formData = new FormData();
    for (var val of files) {
      formData.append('file', val);
    }

    const urlparams = new URLSearchParams([]);
    if(getDataParams) {
    Object.keys(getDataParams).forEach((key) =>
      urlparams.append(key, getDataParams[key])
    );
    }
  
      const response = await axios.post(apiUrlPathSuffix, formData, {
        withCredentials: true,
        params: urlparams,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;

  
  } catch (error) {
    console.log(error)
    handleErrors(error);
  }
}
