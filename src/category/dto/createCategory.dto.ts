import { IsString } from "class-validator";

class CreateCategoryDto {
  @IsString()
  categoryName: string;
}

export default CreateCategoryDto;
