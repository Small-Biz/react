"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Blog } from "@/types";

interface BlogCardProps{
    data:Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({
    data
}) => {
    const router = useRouter();

    const handleClick=() =>{
        router.push(`/blog/${data?.id}`);
    }
    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.thumbnail}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
            </div>
            {/* Title */}
            <div>
                <p className="font-semibold text-lg">
                    {data.title}
                </p>
            </div>
        </div>
    )
}

export default BlogCard;