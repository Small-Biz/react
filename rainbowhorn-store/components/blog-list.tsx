import { Blog, Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import BlogCard from "@/components/ui/blog-card";

interface BlogListProps{
    items: Blog[];
}

const BlogList:React.FC<BlogListProps> = ({
    items
}) =>{
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-3xl">Blogs</h3>
            {items.length ===0 && <NoResults/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item)=>(
                    <BlogCard data={item} key={item.id}/>
                ))}
            </div>            
        </div>
    )
}

export default BlogList;