import baseUrl from "./baseurl"
import commonapi from "./commonapi"

// addresumeAPI - POST
export const addResumeAPI = async (resume) =>{
    return await commonapi('POST',`${baseUrl}/resumes`,resume)
}

// editResumeAPI - PUT
export const editResumeAPI = async (id, resume) => {
    return await commonapi('PUT',`${baseUrl}/resumes/${id}`,resume)
}

// addDownloadHistoryAPI - POST
export const addDownloadHistoryAPI = async (resume) =>{
    return await commonapi('POST',`${baseUrl}/history`,resume)
}

// getHistoryAPI - GET
export const getHistoryAPI = async () =>{
    return await commonapi('GET',`${baseUrl}/history`,{})
}

// deleteHistoryAPI - DELETE
export const deleteHistoryAPI = async (id) =>{
    return await commonapi('DELETE',`${baseUrl}/history/${id}`,{})
}

// getResumeAPI
export const getResumeAPI = async (id) => {
    return await commonapi("GET",`${baseUrl}/resumes/${id}`,{})
}