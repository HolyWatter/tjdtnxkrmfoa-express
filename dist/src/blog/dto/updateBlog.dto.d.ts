export declare class UpdateBlogDto {
    blogName: string;
    description: string;
    thumbnailUrl: string;
    nickname: string;
}
export declare class UpdateBlogDtoWithId extends UpdateBlogDto {
    blogId: string;
}
