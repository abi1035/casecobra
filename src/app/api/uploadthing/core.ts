import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp"
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() })) //We are installing zod because the image we upload happens to be an object
    .middleware(async ({ input }) => {
      return { input }; // We are taking the in the input we are passing it through the middleware
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;


      // Gets the image
      const res=await fetch(file.url)
      // Converts to buffer
      const buffer=await res.arrayBuffer()

      // Gets the heigth,width etc from the metadata
      const imgMetadata=await sharp(buffer).metadata()
      
      const{width,height}=imgMetadata

      if(!configId){
        const configuration=await db.configuration.create({
          data:{
            imageUrl:file.url,
            height:height || 500,
            width:width || 500,
          }
        })
        return {configId:configuration.id}
      }else{
        const updatedConfiguration=await db.configuration.update({
          where:{
            id:configId
          },
          data:{
            croppedImageUrl:file.url
          }
        })

        return {configId:updatedConfiguration.id}
      }

      
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
