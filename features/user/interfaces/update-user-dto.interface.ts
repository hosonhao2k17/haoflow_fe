import { CreateUserDto } from "./create-user-dto.interface";


export interface UpdateUserDto extends Partial<Omit<CreateUserDto,'password'>> {

}