import React, { useState, useCallback } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { updatedAvatar } from '../store/userSlice';
import toast from 'react-hot-toast';

// Utility to crop image
import getCroppedImg from '../utils/cropImage';

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // Handle image selection
    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            toast.error("Only JPG and PNG formats are allowed!");
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("File size must be less than 2MB!");
            return;
        }

        // Read and display image
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result);
        reader.readAsDataURL(file);
    };

    // Handle cropping complete
    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    // Handle uploading cropped image
    const handleUpload = async () => {
        if (!croppedAreaPixels || !imageSrc) return;

        try {
            setLoading(true);
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

            const formData = new FormData();
            formData.append('avatar', croppedImageBlob, "avatar.jpg");

            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            });

            const { data: responseData } = response;
            dispatch(updatedAvatar(responseData.data.avatar));
            toast.success("Avatar updated successfully!");
            close();

        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center transition-all'>
            <div className='bg-white max-w-sm w-full rounded-lg p-6 flex flex-col items-center justify-center shadow-lg relative'>
                
                {/* Close Button */}
                <button onClick={close} className='absolute top-3 right-3 text-neutral-600 hover:text-red-500 transition'>
                    <IoClose size={22}/>
                </button>

                {/* Avatar or Cropping Area */}
                <div className='w-40 h-40 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden border-2 border-primary-200 shadow-md relative'>
                    {imageSrc ? (
                        <div className="relative w-full h-full">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1} // 1:1 aspect ratio
                                onCropChange={setCrop} // Allows moving the crop area
                                onZoomChange={setZoom} // Allows zooming
                                onCropComplete={onCropComplete}
                                showGrid={false} // Optional: Remove grid overlay
                            />
                        </div>
                    ) : user.avatar ? (
                        <img src={user.avatar} alt={user.name} className='w-full h-full object-cover' />
                    ) : (
                        <FaRegUserCircle size={70} className='text-gray-400' />
                    )}
                </div>

                {/* Zoom Slider */}
                {imageSrc && (
                    <div className="mt-4 w-full px-6">
                        <label className="text-sm font-medium">Zoom:</label>
                        <input 
                            type="range" 
                            min={1} 
                            max={3} 
                            step={0.1} 
                            value={zoom} 
                            onChange={(e) => setZoom(e.target.value)}
                            className="w-full cursor-pointer"
                        />
                    </div>
                )}

                {/* Image Selection & Upload Buttons */}
                {!imageSrc ? (
                    <label htmlFor='uploadProfile' className='mt-4 cursor-pointer'>
                        <div className='border border-primary-200 cursor-pointer hover:bg-primary-200 text-primary-900 px-6 py-2 rounded-lg text-sm font-semibold transition shadow-md'>
                            Choose Image
                        </div>
                        <input 
                            onChange={handleSelectImage} 
                            type='file' 
                            id='uploadProfile' 
                            className='hidden' 
                            accept="image/jpeg, image/png"
                            aria-label="Select profile image"
                        />
                    </label>
                ) : (
                    <div className='flex gap-4 mt-4'>
                        <button 
                            onClick={() => setImageSrc(null)}
                            className='border border-gray-400 px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-gray-200'>
                            Cancel
                        </button>
                        <button 
                            onClick={handleUpload}
                            className='bg-primary-200 text-white px-6 py-2 rounded-lg text-sm font-semibold transition hover:bg-primary-100'>
                            {loading ? (
                                <span className="animate-spin">🔄</span>
                            ) : (
                                "Upload"
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserProfileAvatarEdit;
