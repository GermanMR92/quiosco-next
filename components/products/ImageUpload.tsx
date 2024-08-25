"use client";
{/* uploadPreset was configured in the Cloudinary account */ }
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from "react-icons/tb";
import Image from 'next/image';

export default function ImageUpload() {

  const [imageUrl, setImageUrl] = useState('');

  return (
    <CldUploadWidget
      uploadPreset='cy0kdyac'
      options={{
        maxFiles: 1,
        clientAllowedFormats: ['png', 'jpeg', 'jpg'],
      }}
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          widget.close();
          // @ts-ignore
          setImageUrl(result.info?.secure_url); // We have configured next.config.mjs to allow reading cloudinary image paths 
        }
      }}
    >
      {({ open }) => (
        <>
          <div className='space-y-2'>
            <label className='text-slate-800'>Imagen producto</label>
            <div
              onClick={() => open()}
              className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
            >
              <TbPhotoPlus size={50} />

              <p className='text-g font-semibold'>Agregar imagen</p>

              {imageUrl && (
                <div className='absolute inset-0 w-full h-full'>
                  <Image
                    fill
                    src={imageUrl}
                    style={{ objectFit: 'contain' }}
                    alt={'Imagen de producto'}
                  />
                </div>
              )}

            </div>
          </div>

          <input
            type="hidden"
            name="image"
            value={imageUrl}
          />

        </>
      )}
    </CldUploadWidget>
  )
}
