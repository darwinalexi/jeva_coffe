import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Change_password=({onclose})=>{
    const scrollStyle={
        scrollbarWidth:'none'
    }
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative shadow-lg overflow-scroll h-[80%]" style={scrollStyle}>
                <div className=" border-b-1 border-b-[#003333]">
                    <h1 className=" text-[#003333] text-2xl font-bold">¿Has Olvidado tu clave de Acceso a JEVACOFFE ?</h1>
                    <FontAwesomeIcon icon={faClose} onClick={onclose} /> 
                </div>

                <form>
                        <div>
                            <label> Ingresa aqui tu correo electronico con el que te registraste en nuestra plataforma</label>
                        <input type="email" className="w-full focus-outline" />
                        </div>

                    </form>

             </div>
         </div>    
    )
}