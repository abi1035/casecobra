"use server"

import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const  getPaymentStatus= async ({orderId}:{orderId:string})=>{
    const{getUser}=getKindeServerSession()
    const user=await getUser()

    if(!user?.id || !user.email){
        throw new Error ("You need to be logged in")
    }

    const order=await db.order.findFirst({
        where:{id: orderId, userId:user.id},

        // We getting a hold of all this data to show the user on our thank you page
        include:{
            billingAddress:true,
            configuration:true,
            shippingAddress:true,
            user:true,
        }
    })


    if(!order) throw new Error("This order does not exist.")

    if(order.isPaid){
        return order
    }else{
        return false
    }
}