import { Connection } from "mysql2";
export declare class CommentService {
    private db;
    constructor(db: Connection);
    writeComment(pid: string, username: string, password: string, comment: string): Promise<void>;
    deleteComment(id: string, password: string): Promise<void>;
}
