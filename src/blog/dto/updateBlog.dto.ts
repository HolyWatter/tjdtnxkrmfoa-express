import { IsString } from "class-validator";

export class UpdateBlogDto {
  @IsString()
  blogName: string;

  @IsString()
  description: string;

  @IsString()
  thumbnailUrl: string;
}

export class UpdateBlogDtoWithId extends UpdateBlogDto {
  blogId: string;
}
