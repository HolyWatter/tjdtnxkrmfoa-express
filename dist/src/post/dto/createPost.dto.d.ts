export declare class CreatePostBodyDto {
    title: string;
    content: string;
    categoryId: number;
}
export declare class CreatePostDto extends CreatePostBodyDto {
    authorId: number;
}
