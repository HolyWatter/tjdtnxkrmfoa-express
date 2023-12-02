import { Connection } from "mysql2";
declare class CategoryService {
    private db;
    constructor(db: Connection);
    getUserCategory(uid: string): Promise<import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader").ResultSetHeader[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket").RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket").OkPacket[] | import("mysql2/typings/mysql/lib/protocol/packets/ProcedurePacket").ProcedureCallPacket>;
    createCategory(categoryName: string, userId: number): Promise<void>;
    deleteCategory(cid: string): Promise<void>;
    updateCategory(categoryName: string, cid: string): Promise<void>;
}
export default CategoryService;
