import { useForm } from "react-hook-form";
import { validCardDate } from '../utils';
// import { ChangeEventHandler, FormEventHandler, useState } from "react";


const CheckoutForm = () => {

    // const [email, setEmail] = useState("")

    // const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    //     e.preventDefault
    // }
    
    // const handleEmailChange: ChangeEventHandler<HTMLInputElement> = e => {
    //     setEmail(e.target.value)
    //     console.log(email);
        
    // }


    interface FormData {
        email: string;
        checkbox: boolean;
        expirationDate: string;
      };

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => console.log(data));


    return <>
    <form onSubmit={ onSubmit }>
        <label htmlFor="email">
            email
            <input 
                {...register("email", {required: "This field is required"})}
        
                type="email" />
                {errors.email && <span>{errors.email?.message}</span>}
        </label>
        <label htmlFor="checkbox">
            checkbox
            <input 
                {...register("checkbox")}
                type="checkbox" />
        </label>
        <label htmlFor="checkbox">
            checkbox
            <input 
                {...register("expirationDate", {
                    required: true, 
                    pattern: /\d\d\/\d\d$/,
                    validate: validCardDate
                })}
                type="text" />
                {/* mozna dopracować walidację */}
                {/* zrobić reuzywalny komponent dla spana i inputa */}
                {errors.expirationDate && <span>{errors.expirationDate?.message}</span>}
        </label>
        <button type="submit">Zamów</button>
    </form>
</>
}

export default CheckoutForm