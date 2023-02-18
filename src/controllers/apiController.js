import baseURL from '../baseURL'

export const addIncinerationProgress =async(data,token)=>{

  try {
    
    let resp=await fetch(`${baseURL}/addIncineration`,{method:"POST",headers:{"Content-Type":'application/json',"authorization":token},body:JSON.stringify(data)});
    resp=await resp.json();
    if(resp.success){
      return resp;
    }
    return resp
  } catch (error) {
    return error.message;
  }
}

export const login=async(data)=>{
  try {
    
    let resp=await fetch(`${baseURL}/login`,{method:"POST",headers:{"Content-Type":'application/json'},body:JSON.stringify(data)});
    resp=await resp.json();

    if(resp.success){
      return resp;
    }
    return false

  } catch (error) {
    return false
  }
}

export const getIncinerationProgress=async(token)=>{
  try {
  
     let resp=await fetch(`${baseURL}/getIncineration`,{headers:{"authorization":token}})
     resp=await resp.json();
     if(resp.success){
      return resp
     }

     return false

  } catch (error) {
    return false
  }
}

export const getSummary=async(token,date,to,locations)=>{
  try {
       let resp=await fetch(`${baseURL}/getIncinerationSummary?from=${date}&to=${to}`,{headers:{"authorization":token,"Content-Type":'application/json'},method:"POST",body:JSON.stringify({locations})})
     resp=await resp.json();
     if(resp.success){
      return resp
     }

     return false

  } catch (error) {
    return false
  }
}

export const getPieData=async(token,date,to,locations)=>{
  try {

    let resp=await fetch(`${baseURL}/getPieData?from=${date}&to=${to}`,{headers:{"authorization":token,"Content-Type":'application/json'},method:"POST",body:JSON.stringify({locations})})
     resp=await resp.json();
     if(resp.success){
      return resp
     }

     return false
    
  } catch (error) {
    return false
  }
}

export const getStackedData=async(token,date,to,locations)=>{
  try {

    let resp=await fetch(`${baseURL}/getStackedData?from=${date}&to=${to}`,{headers:{"authorization":token,"Content-Type":'application/json'},method:"POST",body:JSON.stringify({locations})})
    resp=await resp.json()
     if(resp.success){
      return resp
     }

     return false
    
  } catch (error) {
    return false
  }
}

export const getLineData=async(token,date,to,locations)=>{

  try {

    let resp=await fetch(`${baseURL}/getLineData?from=${date}&to=${to}`,{headers:{"authorization":token,"Content-Type":'application/json'},method:"POST",body:JSON.stringify({locations})})
    resp=await resp.json()

    if(resp.success){
      return resp
     }

     return false
    
  } catch (error) {
    return false
  }
}

export const getColorMappingData=async(token,date,to,locations)=>{
  try {

    let resp=await fetch(`${baseURL}/getColorMappingData?from=${date}&to=${to}`,{headers:{"authorization":token,'Content-Type':'application/json'},method:"POST",body:JSON.stringify({locations})})
    resp=await resp.json()
     if(resp.success){
      return resp
     }

     return false
    
  } catch (error) {
    return false
  }
}

export const getStackedLineData=async(token,date)=>{

  try {
  
    let resp=await fetch(`${baseURL}/getStackedLineData?date=${date}`,{headers:{"authorization":token}})

    resp=await resp.json();
    if(resp.success){
     return resp
    }

    return false

 } catch (error) {
   return false
 }
}

export const getSingle=async(token,id)=>{

  try {
    
    let resp=await fetch(`${baseURL}/getSingle/${id}`,{headers:{"authorization":token}});
    resp=await resp.json();
    if(resp.success){
      return resp
    }

    return false

  } catch (error) {
    return false
  }

}
export const update=async(data,token,id)=>{

  try {
    
    let resp=await fetch(`${baseURL}/edit/${id}`,{method:"PUT",body:JSON.stringify(data),headers:{"authorization":token,'Content-Type':"application/json"}});
    resp=await resp.json();
    if(resp.success){
      return resp
    }

    return false

  } catch (error) {
    return false
  }

}
export const deletee=async(token,id)=>{

  try {
    
    let resp=await fetch(`${baseURL}/delete/${id}`,{method:"DELETE",headers:{"authorization":token}});
    resp=await resp.json();
    if(resp.success){
      return resp
    }

    return false

  } catch (error) {
    return false
  }

}
export const getLocation=async(token,onlyunArchive)=>{

  try {
    
    let resp=await fetch(`${baseURL}/getLocation${onlyunArchive?"?onlyunArchive=true":''}`,{headers:{"authorization":token}});
    resp=await resp.json();
    if(resp.success){
      return resp.message
    }

    return false

  } catch (error) {
    return false
  }

}
export const addLocation=async(token,location)=>{

  try {
    
    let resp=await fetch(`${baseURL}/addLocation`,{headers:{"authorization":token,"Content-Type":'application/json'},method:"POST",body:JSON.stringify({location})});
    resp=await resp.json();
    if(resp){
      return resp
    }

    return false

  } catch (error) {
    return false
  }

}
export const updateArchive=async(token,id,change)=>{

  try {
    
    let resp=await fetch(`${baseURL}/updateArchive/${id}`,{headers:{"authorization":token,"Content-Type":'application/json'},method:"PUT",body:JSON.stringify({change})});
    resp=await resp.json();
    
    if(resp){
      return resp
    }

    return false

  } catch (error) {
    return false
  }

}


export const dashboard=async(token)=>{

  try {
    
    let resp=await fetch(`${baseURL}/dashboard`,{headers:{"Authorization":token}});
    resp=await resp.json();
    if(resp){
      return resp
    }

    return false

  } catch (error) {
    return false
  }

}

export const locationWiseData=async(token)=>{
  try {
    
    let resp=await fetch(`${baseURL}/locationWiseData`,{headers:{"Authorization":token}});
    resp=await resp.json();
    if(resp){
      return resp
    }

    return false

  } catch (error) {
    return false
  }
}

export const changePassword=async(token,data)=>{
  try {
    
    let resp=await fetch(`${baseURL}/updatePassword`,{method:"PUT",headers:{"Content-Type":"application/json","Authorization":token},body:JSON.stringify(data)});
    resp=await resp.json();
    
    if(resp){
      return resp
    }

    return false;

  } catch (error) {
    return false
  }
}

export const getDashboardLineData=async()=>{
  try {
    
    let resp=await fetch(`${baseURL}/currenMonthLine`);
    resp=await resp.json();
    
    if(resp){
      return resp
    }

    return false;

  } catch (error) {
    return false
  }
}

export const updateLocation = async (token,id,location)=>{
  try {
    
    let resp=await fetch(`${baseURL}/updateLocation/${id}`,{method:"PUT",headers:{"Content-Type":"application/json","Authorization":token},body:JSON.stringify({location})});
    resp=await resp.json();
    
    if(resp){
      return resp
    }
  } catch (error) {
    return false
  }
}

export const deleteLocation=async(token,id)=>{
  try {
    
    let resp = await fetch(`${baseURL}/deleteLocation/${id}`,{method:"DELETE",headers:{"Content-Type":"application/json","Authorization":token}});
    resp = await resp.json()

    if(resp){
      return resp
    }

    return false

  } catch (error) {
    return false
  }
}