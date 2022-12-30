import baseURL from '../baseURL'

export const addIncinerationProgress =async(data,token)=>{

  try {
    
    let resp=await fetch(`${baseURL}/addIncineration`,{method:"POST",headers:{"Content-Type":'application/json',"authorization":token},body:JSON.stringify(data)});
    resp=await resp.json();
    if(resp.success){
      return resp;
    }
    return false
  } catch (error) {
    return false
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

export const getSummary=async(token,date)=>{
  try {
  
     let resp=await fetch(`${baseURL}/getIncinerationSummary?date=${date}`,{headers:{"authorization":token}})
     resp=await resp.json();
  
     if(resp.success){
      return resp
     }

     return false

  } catch (error) {
    return false
  }
}

export const getPieData=async(token,date)=>{
  try {

    let resp=await fetch(`${baseURL}/getPieData?date=${date}`,{headers:{"authorization":token}})
     resp=await resp.json();
    
     if(resp.success){
      return resp
     }

     return false
    
  } catch (error) {
    return false
  }
}

export const getStackedData=async(token,date)=>{
  try {

    let resp=await fetch(`${baseURL}/getStackedData?date=${date}`,{headers:{"authorization":token}})
    resp=await resp.json()
     if(resp.success){
      return resp
     }

     return false
    
  } catch (error) {
    return false
  }
}

export const getLineData=async(token,date)=>{

  try {

    let resp=await fetch(`${baseURL}/getLineData?date=${date}`,{headers:{"authorization":token}})
    resp=await resp.json()
     if(resp.success){
      return resp
     }

     return false
    
  } catch (error) {
    return false
  }
}

export const getColorMappingData=async(token,date)=>{
  try {

    let resp=await fetch(`${baseURL}/getColorMappingData?date=${date}`,{headers:{"authorization":token}})
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
    console.log(resp);
    if(resp.success){
     return resp
    }

    return false

 } catch (error) {
   return false
 }
}

export const addOperatorData=async(token,data)=>{
  try {
    let resp=await fetch(`${baseURL}/addOperator`,{
      method:"POST",
      headers:{'Content-Type':'application/json','authorization':token},
      body:JSON.stringify(data)
    })
    resp=await resp.json()
    if(resp.success){
      return resp
    }
    return false

  } catch (error) {
    return false
  }
}

export const getOperator=async(token)=>{

  try {
    
    let resp=await fetch(`${baseURL}/getOperator`,{headers:{"authorization":token}});
    resp=await resp.json();

    if(resp.success){
      return resp
    }

    return false

  } catch (error) {
    return false
  }
}


export const getOperatorSumary=async(token,date)=>{

  try {
    
    let resp=await fetch(`${baseURL}/getOperatorSummary?date=${date}`,{headers:{"authorization":token}});
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
    console.log(resp);
    if(resp.success){
      return resp
    }

    return false

  } catch (error) {
    return false
  }

}