import { CreateUserDto } from "@/features/user/interfaces/create-user-dto.interface";



export interface Register extends Pick<CreateUserDto,'fullName' | 'email' | 'password' | 'gender' | 'birthDate'>{

}