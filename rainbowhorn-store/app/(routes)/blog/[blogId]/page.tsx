import getBlogs from "@/actions/get-blogs";
import BlogList from "@/components/blog-list";
import Container from "@/components/ui/container";

const BlogPage= async()=>{

    const blogList= await getBlogs('story');

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <BlogList items={blogList}/>
                </div>
            </div>  
        </Container>
    )
}

export default BlogPage;