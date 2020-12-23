
export const validateEmail = (email)=>{
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
    if (reg.test(email) == false) 
    {
        
        return (false);
    }
    return true;
}

export const firstWordCaptial = str=>{
    return  str.charAt(0).toUpperCase() + str.substring(1);
}

export const checkIfSomethingMissing =  (obj)=>{
    for(let key in obj){
        let a = [];
        if(!obj[key]){
            a.push(key);
        }
        return a;
    }
}

