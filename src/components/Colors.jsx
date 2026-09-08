import { useState } from "react";


function Colors(){

const colors = [
    { id: 'blue', name: 'Titanio Azul', image: '../../public/img/iphone-blue.jpg', colorClass: 'bg-blue-500' },
    { id: 'silver', name: 'Titanio Prata', image: '../../public/img/iphone-silver.jpg', colorClass: 'bg-gray-300' },
    { id: 'orange', name: 'Titanio Laranja', image: '../../public/img/iphone-orange.jpg', colorClass: 'bg-orange-500' }
];


const models = [
    { id: 'Pro Max', screen: '6.9 polegadas', Storage: '256BG, 512GB ou 1TB', battery: '33h de video', weight: '221g' },
    { id: 'Pro', screen: '6.9 polegadas', Storage: '128BG, 256GB ou 512GB', battery: '29h de video', weight: '199g' }
];
    

const [selectedColor, setSelectedColor] = useState('blue')

    return(
        <section id="cores" className="bg-black py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl mb:text-6xl font-bold mb-4">Escolha a Cor</h2>
                    <p className="text-gray-400 text-xl">tres acabamentos em titanio lindos</p>
                </div>

                <div className="flex justify-center mb-16">
                    <div className="relative w-full max-w-3xl">
                        <div className="relative flex items-center justify-center min-h-125">
                            <img src={colors.find(color => color.id === selectedColor).image} alt="iphone 17" className="max-w-full max-h-150 mx-auto" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0  text-center">
                            <div className="px-8 py-4 rounded-full backdrop-blur-md bg-black/40 inline-block">
                                <h3 className="text-xl font-semibold">{colors.find(color => color.id === selectedColor).name}</h3>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="flex justify-center items-center gap-4">
                    {colors.map( color => (
                        <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className={`relative transition-all duration-300 cursor-pointer hover:scale-105`}
                        >

                           <div className={`w-12 h-12 rounded-full ${color.colorClass} ${selectedColor === color.id ? 'border-4 border-white' : 'border-2 border-gray-600'}`}></div> 
                        </button>
                    ))}
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    {models.map((model, index) => (
                        <div key={index} className="bg-linear-to-b from-gray-900 to-black rounded-3xl p-8 border border-gray-800">

                            <div className="text-3xl mb-4">📱</div>
                            <h3 className="text-2xl font-bold mb-3">{model.name}</h3>
                            <p className="text-gray-500 mb-4 font-semibold">{model.screen}</p>

                            <ul className="space-y-2 text-gray-400">
                                <li>{model.Storage}</li>
                                <li>{model.battery}</li>
                                <li>{model.weight}</li>
                            </ul>

                        </div>
                    ))}
                </div>


                <div className="text-center mt-16">

                    <button className="bg-blue-800 hover:bg-blue-700 text-white px-8 py-3 mb-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50 cursor-pointer">
                        Compre agora á partir de R$ 9.922,00
                    </button>
                    <p>OU em até 12x de 774,92 sem juros</p>
                </div>


            </div>


        </section>
    )
}

export default Colors