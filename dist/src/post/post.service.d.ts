import { Connection } from "mysql2";
import { CreatePostDto } from "./dto/createPost.dto";
declare class PostService {
    private db;
    constructor(db: Connection);
    getSearchedPost(uid: string, keyword: string): Promise<{
        postCount: any;
        posts: import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket;
    }>;
    getPostByPid(pid: string): Promise<any>;
    getUserAllPost(uid: string): Promise<any>;
    getUserPostByCid(uid: string, cid: string): Promise<any>;
    createPost({ title, content, categoryId, authorId }: CreatePostDto): Promise<void>;
    deletePost(pid: string): Promise<void>;
}
export default PostService;
