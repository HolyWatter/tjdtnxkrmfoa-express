import { IsNumber, IsString } from "class-validator";

export class CreatePostBodyDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsNumber()
  categoryId: number;
}

export class CreatePostDto extends CreatePostBodyDto {
  @IsString()
  authorId: number;
}
