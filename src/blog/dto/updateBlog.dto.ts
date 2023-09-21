import { IsString } from "class-validator";

class UpdateBlogDto {
  @IsString()
  blogName: string;

  @IsString()
  description: string;

  @IsString()
  thumbnailUrl: string;
}

export default UpdateBlogDto;
