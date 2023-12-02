import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePostBodyDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsNumber()
  categoryId: number;
  @IsBoolean()
  isPinned: boolean;
  @IsString()
  thumbnailUrl: string;
}

export class CreatePostDto extends CreatePostBodyDto {
  @IsString()
  authorId: number;
}
