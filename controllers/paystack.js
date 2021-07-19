const fetch = require('isomorphic-fetch')


const  initPaystack = async(req,res)=>{
 try{
    const response = await  fetch ('https://api.paystack.co/transaction/initialize',{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "email": req.body.email,
            "amount": "5000"
        })
    })
    const r = await response.json()
    console.log(r)
    // res.redirect(r.data.authorization_url)
 }catch(err){
     console.log(err)
 }
   
      
}
const recurringCharge = async (data)=>{
    try{
        const response = await  fetch ('https://api.paystack.co/transaction/charge_authorization',{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${process.env.PAYSTACK_SECRETKEY}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const r = await response.json()
    return r
    }catch(err){
        console.log(err)
    }
   
}

// const verifyPay = async(req,res,next) =>{
   
  
   
//     try{
       
      
        
//         Cards.addCard(r.data)
        
        
        
//      }catch(err){
//          console.log(err)
//      }

// }
module.exports= {
    initPaystack,
    recurringCharge
   // verifyPay
}