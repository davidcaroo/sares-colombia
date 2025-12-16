import React from 'react';
import { Shield, Truck, RefreshCw } from 'lucide-react';

const PoliciesPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Políticas y Términos</h1>
          <p className="text-gray-600">
            Transparencia y claridad en cada paso de nuestra relación comercial.
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Política de Tratamiento de Datos */}
          <section id="data-policy" className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Política de Tratamiento de Datos</h2>
            </div>
            
            <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 text-sm mb-6">
                <p className="font-bold text-gray-900 mb-3 border-b border-blue-200 pb-2">Información del Responsable del Tratamiento:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                  <p><span className="font-semibold">Razón Social:</span> COMMERCIAL SARES S.A.S</p>
                  <p><span className="font-semibold">NIT:</span> 901.234.190-4</p>
                  <p className="md:col-span-2"><span className="font-semibold">Dirección:</span> Centro Industrial Ternera Bod. 1 #52 – Cartagena</p>
                  <p><span className="font-semibold">Email:</span> administracion@sarescol.com</p>
                  <p><span className="font-semibold">Teléfono:</span> 314 7260 433</p>
                </div>
              </div>

              <p>
                En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, <strong>COMMERCIAL SARES S.A.S.</strong> informa que los datos personales recolectados a través de nuestros canales comerciales serán tratados de manera confidencial y segura.
              </p>
              <h4 className="font-bold text-gray-800">Finalidad de la recolección:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Procesamiento y envío de pedidos mayoristas.</li>
                <li>Envío de información sobre nuevas colecciones, promociones y actualizaciones de catálogo.</li>
                <li>Gestión contable, fiscal y administrativa.</li>
                <li>Contacto para servicio al cliente y soporte post-venta.</li>
              </ul>
              <p>
                Como titular de los datos, usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de su información de nuestras bases de datos en cualquier momento escribiendo a <strong>administracion@sarescol.com</strong>.
              </p>
            </div>
          </section>

          {/* Política de Envíos */}
          <section id="shipping-policy" className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand-yellow/20 text-yellow-700 rounded-lg">
                <Truck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Política de Envíos</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
              <p>
                Realizamos despachos a todo el territorio nacional colombiano a través de nuestras transportadoras aliadas certificadas.
              </p>
              <h4 className="font-bold text-gray-800">Tiempos de Entrega:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Ciudades Principales:</strong> 2 a 4 días hábiles.</li>
                <li><strong>Poblaciones Intermedias y Destinos Especiales:</strong> 5 a 8 días hábiles.</li>
              </ul>
              <p>
                El tiempo de entrega comienza a contar a partir de la confirmación del pago del pedido. Una vez despachado, se enviará el número de guía al correo electrónico o WhatsApp registrado para su seguimiento.
              </p>
              <p className="text-sm italic">
                *Nota: Los costos de envío para pedidos mayoristas se calculan en base al volumen y peso de la carga, y serán informados por su asesor comercial antes del despacho.
              </p>
            </div>
          </section>

          {/* Política de Cambios y Garantías */}
          <section id="returns-policy" className="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand-red/10 text-brand-red rounded-lg">
                <RefreshCw size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Política de Cambios y Garantías</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
              <p>
                Todos nuestros productos <strong>Havaianas</strong> son 100% originales y cuentan con garantía por defectos de fabricación.
              </p>
              <h4 className="font-bold text-gray-800">Condiciones para Garantías:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>El plazo para solicitar garantía por defecto de fábrica es de <strong>60 días calendario</strong> a partir de la fecha de recepción.</li>
                <li>El producto será evaluado por nuestro departamento de calidad para verificar que el daño corresponde a un defecto de fabricación y no a un mal uso o desgaste natural.</li>
              </ul>
              <h4 className="font-bold text-gray-800">Política de Cambios (Mayoristas):</h4>
              <p>
                Para nuestros clientes mayoristas, aceptamos cambios por rotación de inventario bajo las siguientes condiciones acordadas previamente en el contrato de distribución:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>El producto debe estar en perfecto estado, con sus etiquetas y empaques originales.</li>
                <li>Los costos logísticos de devolución y reenvío por cambios de referencia corren por cuenta del cliente, salvo error en el despacho por parte de Sares Colombia.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;