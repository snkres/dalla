'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { useRef } from 'react';
import { Camera, Check, UserCircle } from 'lucide-react';
import Image from 'next/image';

const AvatarUpload = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isHovered, setIsHovered] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 mb-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative cursor-pointer w-24 h-24"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="absolute inset-0 rounded-full bg-[#234d64]/5 border-2 border-[#234d64]/10 overflow-hidden">
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <UserCircle className="w-12 h-12 text-[#234d64]/40" />
                            </div>
                        )}
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-[#234d64]/10 transition-colors"
                        >
                            <Camera className="w-6 h-6 text-[#234d64]" />
                        </motion.div>
                    </div>
                    {previewUrl && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100"
                        >
                            <Check className="w-3 h-3 text-[#234d64]" />
                        </motion.div>
                    )}
                </motion.div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </motion.div>
            <p className="text-sm text-gray-500">
                Upload your profile picture
            </p>
        </div>
    );
};

export default AvatarUpload;