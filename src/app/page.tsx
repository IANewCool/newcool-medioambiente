'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas SEREMI Medio Ambiente por region
const OFICINAS = [
  { id: 1, nombre: 'SEREMI Arica y Parinacota', region: 'Arica y Parinacota', direccion: '7 de Junio 299', telefono: '58 2201800', email: 'oirs.aricayparinacota@mma.gob.cl' },
  { id: 2, nombre: 'SEREMI Tarapaca', region: 'Tarapaca', direccion: 'Arturo Prat 461', telefono: '57 2411700', email: 'oirs.tarapaca@mma.gob.cl' },
  { id: 3, nombre: 'SEREMI Antofagasta', region: 'Antofagasta', direccion: 'Arturo Prat 461', telefono: '55 2659700', email: 'oirs.antofagasta@mma.gob.cl' },
  { id: 4, nombre: 'SEREMI Atacama', region: 'Atacama', direccion: 'Copiapo 484', telefono: '52 2212900', email: 'oirs.atacama@mma.gob.cl' },
  { id: 5, nombre: 'SEREMI Coquimbo', region: 'Coquimbo', direccion: 'Cordovez 281', telefono: '51 2312500', email: 'oirs.coquimbo@mma.gob.cl' },
  { id: 6, nombre: 'SEREMI Valparaiso', region: 'Valparaiso', direccion: 'Melgarejo 669', telefono: '32 2507800', email: 'oirs.valparaiso@mma.gob.cl' },
  { id: 7, nombre: 'SEREMI Metropolitana', region: 'Metropolitana', direccion: 'San Martin 73', telefono: '2 2573 5600', email: 'oirs.metropolitana@mma.gob.cl' },
  { id: 8, nombre: 'SEREMI OHiggins', region: 'OHiggins', direccion: 'Campos 423', telefono: '72 2233100', email: 'oirs.ohiggins@mma.gob.cl' },
  { id: 9, nombre: 'SEREMI Maule', region: 'Maule', direccion: '1 Norte 641', telefono: '71 2515700', email: 'oirs.maule@mma.gob.cl' },
  { id: 10, nombre: 'SEREMI Nuble', region: 'Nuble', direccion: '18 de Septiembre 580', telefono: '42 2433500', email: 'oirs.nuble@mma.gob.cl' },
  { id: 11, nombre: 'SEREMI Biobio', region: 'Biobio', direccion: 'Serrano 529', telefono: '41 2861500', email: 'oirs.biobio@mma.gob.cl' },
  { id: 12, nombre: 'SEREMI Araucania', region: 'Araucania', direccion: 'Claro Solar 55', telefono: '45 2747600', email: 'oirs.araucania@mma.gob.cl' },
  { id: 13, nombre: 'SEREMI Los Rios', region: 'Los Rios', direccion: 'O\'Higgins 445', telefono: '63 2221800', email: 'oirs.losrios@mma.gob.cl' },
  { id: 14, nombre: 'SEREMI Los Lagos', region: 'Los Lagos', direccion: 'Urmeneta 509', telefono: '65 2483700', email: 'oirs.loslagos@mma.gob.cl' },
  { id: 15, nombre: 'SEREMI Aysen', region: 'Aysen', direccion: 'Moraleda 233', telefono: '67 2233000', email: 'oirs.aysen@mma.gob.cl' },
  { id: 16, nombre: 'SEREMI Magallanes', region: 'Magallanes', direccion: 'Bories 901', telefono: '61 2241600', email: 'oirs.magallanes@mma.gob.cl' }
];

// Tipos de residuos y reciclaje
const RESIDUOS = [
  { tipo: 'Plasticos', icono: '🥤', contenedor: 'Amarillo', ejemplos: ['Botellas PET', 'Envases', 'Bolsas'], consejos: 'Limpiar y aplastar antes de reciclar' },
  { tipo: 'Vidrios', icono: '🍾', contenedor: 'Verde', ejemplos: ['Botellas', 'Frascos', 'Envases'], consejos: 'Separar por color, sin tapas' },
  { tipo: 'Papeles y Cartones', icono: '📦', contenedor: 'Azul', ejemplos: ['Diarios', 'Revistas', 'Cajas'], consejos: 'Secos y limpios, sin plasticos' },
  { tipo: 'Metales', icono: '🥫', contenedor: 'Amarillo', ejemplos: ['Latas', 'Tapas', 'Papel aluminio'], consejos: 'Limpiar y aplastar' },
  { tipo: 'Organicos', icono: '🍂', contenedor: 'Cafe/Marron', ejemplos: ['Restos comida', 'Cascaras', 'Hojas'], consejos: 'Compostar en casa o punto limpio' },
  { tipo: 'Electronicos', icono: '📱', contenedor: 'Punto Limpio', ejemplos: ['Celulares', 'Pilas', 'Computadores'], consejos: 'Llevar a puntos de reciclaje especializados' },
  { tipo: 'Aceites', icono: '🛢️', contenedor: 'Punto Limpio', ejemplos: ['Aceite cocina', 'Aceite motor'], consejos: 'En botellas cerradas a punto limpio' },
  { tipo: 'Textiles', icono: '👕', contenedor: 'Contenedor Ropa', ejemplos: ['Ropa usada', 'Zapatos', 'Telas'], consejos: 'Limpios y en buen estado para donar' }
];

// Parques Nacionales y Areas Protegidas
const AREAS_PROTEGIDAS = [
  { nombre: 'Parque Nacional Torres del Paine', region: 'Magallanes', hectareas: 181414, destacado: 'Patrimonio de la Biosfera UNESCO' },
  { nombre: 'Parque Nacional Lauca', region: 'Arica y Parinacota', hectareas: 137883, destacado: 'Lago Chungara, vicunas' },
  { nombre: 'Parque Nacional Conguillio', region: 'Araucania', hectareas: 60832, destacado: 'Araucarias milenarias, volcan Llaima' },
  { nombre: 'Parque Nacional Vicente Perez Rosales', region: 'Los Lagos', hectareas: 253780, destacado: 'Volcan Osorno, Saltos del Petrohue' },
  { nombre: 'Parque Nacional Queulat', region: 'Aysen', hectareas: 154093, destacado: 'Ventisquero Colgante' },
  { nombre: 'Parque Nacional Pan de Azucar', region: 'Atacama', hectareas: 43754, destacado: 'Desierto florido, pinguinos' },
  { nombre: 'Parque Nacional La Campana', region: 'Valparaiso', hectareas: 8000, destacado: 'Palma chilena, Darwin' },
  { nombre: 'Parque Nacional Rapa Nui', region: 'Valparaiso', hectareas: 7130, destacado: 'Moais, Patrimonio Mundial' }
];

// Normativa ambiental
const NORMATIVAS = [
  { ley: 'Ley 19.300', nombre: 'Bases Generales del Medio Ambiente', descripcion: 'Marco legal ambiental de Chile', año: 1994 },
  { ley: 'Ley 20.417', nombre: 'Crea Ministerio de Medio Ambiente', descripcion: 'Institucionalidad ambiental', año: 2010 },
  { ley: 'Ley 20.920', nombre: 'Ley REP', descripcion: 'Responsabilidad Extendida del Productor', año: 2016 },
  { ley: 'Ley 21.100', nombre: 'Prohibe Bolsas Plasticas', descripcion: 'Elimina bolsas en comercio', año: 2018 },
  { ley: 'Ley 21.368', nombre: 'Plasticos de Un Solo Uso', descripcion: 'Regula plasticos desechables', año: 2021 },
  { ley: 'Ley 21.202', nombre: 'Humedales Urbanos', descripcion: 'Proteccion de humedales', año: 2020 }
];

// Glosario
const GLOSARIO = [
  { termino: 'Huella de Carbono', definicion: 'Cantidad de gases de efecto invernadero emitidos directa o indirectamente por una persona, organizacion o producto' },
  { termino: 'Biodiversidad', definicion: 'Variedad de especies de seres vivos y ecosistemas en un territorio determinado' },
  { termino: 'Economia Circular', definicion: 'Modelo economico que busca reducir, reutilizar y reciclar para minimizar residuos' },
  { termino: 'Compostaje', definicion: 'Proceso de descomposicion de materia organica para crear abono natural' },
  { termino: 'SEIA', definicion: 'Sistema de Evaluacion de Impacto Ambiental, evalua proyectos antes de su ejecucion' },
  { termino: 'Punto Limpio', definicion: 'Instalacion para depositar residuos reciclables separados' },
  { termino: 'REP', definicion: 'Responsabilidad Extendida del Productor, obliga a fabricantes a gestionar residuos de sus productos' },
  { termino: 'Zona de Sacrificio', definicion: 'Area con alta concentracion industrial y contaminacion ambiental' },
  { termino: 'Norma de Emision', definicion: 'Limite maximo permitido de contaminantes que puede emitir una fuente' },
  { termino: 'Norma de Calidad', definicion: 'Nivel maximo de contaminantes permitido en aire, agua o suelo' },
  { termino: 'Humedal', definicion: 'Ecosistema acuatico con aguas poco profundas, vital para biodiversidad' },
  { termino: 'Cambio Climatico', definicion: 'Alteracion del clima global por aumento de gases de efecto invernadero' }
];

export default function MedioambienteModule() {
  const [busqueda, setBusqueda] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora huella de carbono
  const [kmAuto, setKmAuto] = useState('0');
  const [kmBus, setKmBus] = useState('0');
  const [vuelosCortos, setVuelosCortos] = useState('0');
  const [vuelosLargos, setVuelosLargos] = useState('0');
  const [electricidad, setElectricidad] = useState('150');
  const [gas, setGas] = useState('15');

  const oficinasFiltradas = OFICINAS.filter(o =>
    o.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const calcularHuella = () => {
    // Factores de emision aproximados en kg CO2
    const emisionAuto = parseFloat(kmAuto) * 0.21 * 12; // por mes * 12
    const emisionBus = parseFloat(kmBus) * 0.089 * 12;
    const emisionVuelosCortos = parseFloat(vuelosCortos) * 255; // por vuelo
    const emisionVuelosLargos = parseFloat(vuelosLargos) * 1100;
    const emisionElectricidad = parseFloat(electricidad) * 0.4 * 12; // kWh/mes
    const emisionGas = parseFloat(gas) * 2.0 * 12; // m3/mes

    const total = emisionAuto + emisionBus + emisionVuelosCortos + emisionVuelosLargos + emisionElectricidad + emisionGas;

    return {
      transporte: emisionAuto + emisionBus,
      vuelos: emisionVuelosCortos + emisionVuelosLargos,
      hogar: emisionElectricidad + emisionGas,
      total: total / 1000, // toneladas
      comparacion: total / 1000 < 4 ? 'Bajo el promedio chileno' : total / 1000 < 7 ? 'Promedio chileno' : 'Sobre el promedio'
    };
  };

  const huella = calcularHuella();

  const secciones = [
    { id: 'buscador', nombre: 'Oficinas', icono: '🔍' },
    { id: 'reciclaje', nombre: 'Reciclaje', icono: '♻️' },
    { id: 'calculadora', nombre: 'Huella CO2', icono: '🌡️' },
    { id: 'parques', nombre: 'Parques', icono: '🏞️' },
    { id: 'normativa', nombre: 'Leyes', icono: '📜' },
    { id: 'glosario', nombre: 'Glosario', icono: '📖' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🌿</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Medio Ambiente - NewCooltura Informada
            </h1>
            <p className="text-green-100">
              Oficinas ambientales, reciclaje, calculadora de huella de carbono y areas protegidas
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="sticky top-0 z-40 bg-slate-800/90 backdrop-blur border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-3">
            {secciones.map((seccion) => (
              <button
                key={seccion.id}
                onClick={() => setSeccionActiva(seccion.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === seccion.id
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{seccion.icono}</span>
                <span className="text-sm font-medium">{seccion.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Oficinas */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Oficinas SEREMI Medio Ambiente
              </h2>
              <input
                type="text"
                placeholder="Buscar por region o ciudad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-400 mt-2">
                {oficinasFiltradas.length} oficinas encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {oficinasFiltradas.map((oficina, i) => (
                <motion.div
                  key={oficina.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-green-500 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white">{oficina.nombre}</h3>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                      {oficina.region}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-gray-500">📍</span> {oficina.direccion}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">📞</span> {oficina.telefono}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">📧</span> {oficina.email}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Reciclaje */}
        {seccionActiva === 'reciclaje' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>♻️</span> Guia de Reciclaje
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RESIDUOS.map((residuo, i) => (
                <motion.div
                  key={residuo.tipo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <span className="text-3xl mb-3 block">{residuo.icono}</span>
                  <h3 className="font-bold text-white mb-2">{residuo.tipo}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">Contenedor:</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                      {residuo.contenedor}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="text-xs text-gray-500">Ejemplos:</span>
                    <p className="text-sm text-gray-400">{residuo.ejemplos.join(', ')}</p>
                  </div>
                  <p className="text-xs text-emerald-400">{residuo.consejos}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">💡 Consejos para Reciclar</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Limpia los envases antes de reciclar (sin restos de comida)</li>
                <li>• Separa los materiales: no mezcles plastico con papel</li>
                <li>• Aplasta botellas y latas para ahorrar espacio</li>
                <li>• Busca tu punto limpio mas cercano en santiago.cl o en tu municipalidad</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Calculadora Huella de Carbono */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🌡️</span> Calculadora de Huella de Carbono
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="font-bold text-white mb-4">🚗 Transporte</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Km en auto/mes</label>
                      <input
                        type="number"
                        value={kmAuto}
                        onChange={(e) => setKmAuto(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Km en bus/metro/mes</label>
                      <input
                        type="number"
                        value={kmBus}
                        onChange={(e) => setKmBus(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="font-bold text-white mb-4">✈️ Vuelos al año</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Vuelos cortos (&lt;3 hrs)</label>
                      <input
                        type="number"
                        value={vuelosCortos}
                        onChange={(e) => setVuelosCortos(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Vuelos largos (&gt;3 hrs)</label>
                      <input
                        type="number"
                        value={vuelosLargos}
                        onChange={(e) => setVuelosLargos(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="font-bold text-white mb-4">🏠 Hogar</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Electricidad kWh/mes</label>
                      <input
                        type="number"
                        value={electricidad}
                        onChange={(e) => setElectricidad(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Gas natural m3/mes</label>
                      <input
                        type="number"
                        value={gas}
                        onChange={(e) => setGas(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-fit sticky top-24">
                <h3 className="font-bold text-white mb-4">Tu Huella de Carbono Anual</h3>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">🚗 Transporte terrestre</span>
                    <span className="text-white">{(huella.transporte / 1000).toFixed(2)} ton</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">✈️ Vuelos</span>
                    <span className="text-white">{(huella.vuelos / 1000).toFixed(2)} ton</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">🏠 Hogar</span>
                    <span className="text-white">{(huella.hogar / 1000).toFixed(2)} ton</span>
                  </div>

                  <div className="flex justify-between py-3 bg-green-500/20 rounded-lg px-3 mt-4">
                    <span className="text-white font-bold">Total CO2</span>
                    <span className="text-green-400 font-bold text-xl">{huella.total.toFixed(2)} ton/año</span>
                  </div>

                  <div className={`text-center py-2 rounded-lg ${
                    huella.total < 4 ? 'bg-green-500/20 text-green-400' :
                    huella.total < 7 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {huella.comparacion}
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    * Promedio chileno: ~4.7 ton CO2/año. Promedio mundial: ~4.8 ton.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Parques Nacionales */}
        {seccionActiva === 'parques' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🏞️</span> Parques Nacionales y Areas Protegidas
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {AREAS_PROTEGIDAS.map((parque, i) => (
                <motion.div
                  key={parque.nombre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white">{parque.nombre}</h3>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                      {parque.region}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">
                      <span className="text-gray-500">📐</span> {parque.hectareas.toLocaleString('es-CL')} hectareas
                    </p>
                    <p className="text-sm text-green-400">
                      <span className="text-gray-500">⭐</span> {parque.destacado}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">🌳 Sistema Nacional de Areas Protegidas</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-2xl font-bold text-emerald-400">106</span>
                  <p className="text-sm text-gray-400">Areas Silvestres Protegidas</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-emerald-400">18.6M</span>
                  <p className="text-sm text-gray-400">Hectareas protegidas</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-emerald-400">21%</span>
                  <p className="text-sm text-gray-400">Del territorio nacional</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Normativa Ambiental */}
        {seccionActiva === 'normativa' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📜</span> Normativa Ambiental
            </h2>

            <div className="space-y-4">
              {NORMATIVAS.map((norma, i) => (
                <motion.div
                  key={norma.ley}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">
                      {norma.ley}
                    </span>
                    <span className="px-2 py-1 bg-slate-700 text-gray-400 text-xs rounded">
                      {norma.año}
                    </span>
                  </div>
                  <h3 className="font-bold text-white mb-1">{norma.nombre}</h3>
                  <p className="text-sm text-gray-400">{norma.descripcion}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">🏛️ Instituciones Clave</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">•</span>
                    <div>
                      <span className="text-white font-medium">Ministerio del Medio Ambiente</span>
                      <p className="text-gray-400">Politicas ambientales</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">•</span>
                    <div>
                      <span className="text-white font-medium">Superintendencia del Medio Ambiente</span>
                      <p className="text-gray-400">Fiscalizacion ambiental</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">•</span>
                    <div>
                      <span className="text-white font-medium">Servicio de Evaluacion Ambiental</span>
                      <p className="text-gray-400">Evaluacion de proyectos</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">•</span>
                    <div>
                      <span className="text-white font-medium">CONAF</span>
                      <p className="text-gray-400">Areas protegidas y bosques</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">📋 Como Denunciar</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">1.</span> SMA: sma.gob.cl/denuncias
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">2.</span> Telefono: 600 600 0716
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">3.</span> Presencial en SEREMI regional
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">4.</span> App OIRS Medio Ambiente
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario Ambiental
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-green-400 mb-1">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Medio Ambiente - Un modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-green-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Cuidemos nuestro planeta
          </p>
        </div>
      </footer>
    </div>
  );
}
