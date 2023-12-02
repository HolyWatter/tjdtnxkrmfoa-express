import { Connection } from "mysql2";
import { UpdateBlogDtoWithId } from "./dto/updateBlog.dto";
declare class BlogService {
    private db;
    constructor(db: Connection);
    getBlogInfo(id: string): Promise<any>;
    createBlog: (uid: number) => Promise<void>;
    deleteBlog(id: string): Promise<void>;
    updateBlogInfo({ blogName, description, thumbnailUrl, blogId, nickname, }: UpdateBlogDtoWithId): Promise<void>;
}
export default BlogService;
