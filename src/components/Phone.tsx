import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"


// The html attribute gives the HTMLDIVELEMENT OPtions for our phone props
// And since we specified our classname as phone props we can access them too
interface PhoneProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc:string
    dark?: boolean
}

const Phone=({imgSrc, className, dark=false, ...props}:PhoneProps)=>{
return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden",className)}{...props}>
        <img src={dark ? "/phone-template-dark-edges.png":"/phone-template-white-edges.png"} alt="phone Image" className="pointer-events-none z-50 select-none"/>
        <div className="absolute -z-10 inset-0">
            <img className="object-cover min-w-full min-h-full" src={imgSrc} alt="over laying phone image"/>
        </div>
    </div>
)
}

export default Phone