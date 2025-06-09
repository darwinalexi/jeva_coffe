import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faCoins, faDolly } from '@fortawesome/free-solid-svg-icons';

export const About_buy = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-b border-b-orange-500 border-t border-t-orange-500 border-l border-l-orange-500 border-r border-r-orange-500 m-5 h-[12%] relative left-6 w-[88%]">
                <div className="flex flex-col items-center justify-center m-8">
                    <FontAwesomeIcon icon={faDolly} className="text-orange-500" style={{ fontSize: '40px' }} />
                    <div className="text-center">
                        <h1 className="font-bold">ENVIOS A TODA COLOMBIA</h1>
                        <h1>Los mejores carriers</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                    <FontAwesomeIcon icon={faHeadphones} className="text-orange-500" style={{ fontSize: '40px' }} />
                    <h1 className="font-bold mb-0 text-center">COMPRE  24 x 7</h1>
                    <h1>Despachos todos los dias</h1>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                    <FontAwesomeIcon icon={faCoins} className="text-orange-500" style={{ fontSize: '40px' }} />
                    <h1 className="text-center   font-bold  ">PROMOCIONES</h1>
                    <h1>DESCUENTOS POR TEMPORADA</h1>
                </div>
            </div>
        </>
    );
}
