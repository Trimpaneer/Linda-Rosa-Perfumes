'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { formatPriceCOP } from '@/utils/formatPrice';
import { generateWhatsAppURL } from '@/utils/generateWhatsAppMessage';
import { OrderFormData } from '@/types';

const orderSchema = z.object({
  nombre: z.string().min(3, 'Ingresa tu nombre completo'),
  telefono: z
    .string()
    .min(7, 'Número de teléfono inválido')
    .max(15, 'Número de teléfono inválido')
    .regex(/^[\d\s+\-()]+$/, 'Solo se permiten números y caracteres +()-'),
  correo: z.string().email('Correo electrónico inválido'),
  direccion: z.string().min(5, 'Ingresa tu dirección completa'),
  barrio: z.string().min(2, 'Ingresa tu barrio'),
  ciudad: z.string().min(2, 'Ingresa tu ciudad'),
  departamento: z.string().min(2, 'Ingresa tu departamento'),
});

type OrderSchema = z.infer<typeof orderSchema>;

export function OrderForm() {
  const { items, total, isEmpty } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    if (mounted && isEmpty) {
      router.push('/carrito');
    }
  }, [mounted, isEmpty, router]);

  if (!mounted || isEmpty) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white" aria-live="polite">
        <div className="text-center font-sans text-sm text-[#888]">
          Cargando datos del pedido...
        </div>
      </div>
    );
  }

  const onSubmit = (data: OrderSchema) => {
    const url = generateWhatsAppURL(items, data as OrderFormData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-heading text-4xl text-[#1A1A1A]">Completa tu pedido</h1>
        <div className="w-12 h-px bg-[#C9A84C] mt-2 mb-3" />
        <p className="font-sans text-sm text-[#888]">
          Ingresa tus datos y te contactaremos por WhatsApp para coordinar la entrega.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 space-y-6"
          noValidate
          aria-label="Formulario de pedido"
        >
          <fieldset>
            <legend className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
              Datos personales
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="nombre" className="text-xs tracking-wide font-sans">
                  Nombre completo *
                </Label>
                <Input
                  id="nombre"
                  {...register('nombre')}
                  placeholder="Ej: María García"
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                  className="border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
                />
                {errors.nombre && (
                  <p id="nombre-error" role="alert" className="text-xs text-red-500 font-sans">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="telefono" className="text-xs tracking-wide font-sans">
                  Teléfono / Celular *
                </Label>
                <Input
                  id="telefono"
                  type="tel"
                  {...register('telefono')}
                  placeholder="Ej: 320 261 3152"
                  aria-invalid={!!errors.telefono}
                  aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                  className="border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
                />
                {errors.telefono && (
                  <p id="telefono-error" role="alert" className="text-xs text-red-500 font-sans">
                    {errors.telefono.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="correo" className="text-xs tracking-wide font-sans">
                  Correo electrónico *
                </Label>
                <Input
                  id="correo"
                  type="email"
                  {...register('correo')}
                  placeholder="Ej: maria@gmail.com"
                  aria-invalid={!!errors.correo}
                  aria-describedby={errors.correo ? 'correo-error' : undefined}
                  className="border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
                />
                {errors.correo && (
                  <p id="correo-error" role="alert" className="text-xs text-red-500 font-sans">
                    {errors.correo.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
              Dirección de entrega
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="direccion" className="text-xs tracking-wide font-sans">
                  Dirección *
                </Label>
                <Input
                  id="direccion"
                  {...register('direccion')}
                  placeholder="Ej: Cra 15 #80-25"
                  aria-invalid={!!errors.direccion}
                  aria-describedby={errors.direccion ? 'direccion-error' : undefined}
                  className="border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
                />
                {errors.direccion && (
                  <p id="direccion-error" role="alert" className="text-xs text-red-500 font-sans">
                    {errors.direccion.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="barrio" className="text-xs tracking-wide font-sans">
                  Barrio *
                </Label>
                <Input
                  id="barrio"
                  {...register('barrio')}
                  placeholder="Ej: El Prado"
                  aria-invalid={!!errors.barrio}
                  aria-describedby={errors.barrio ? 'barrio-error' : undefined}
                  className="border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
                />
                {errors.barrio && (
                  <p id="barrio-error" role="alert" className="text-xs text-red-500 font-sans">
                    {errors.barrio.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ciudad" className="text-xs tracking-wide font-sans">
                  Ciudad *
                </Label>
                <Input
                  id="ciudad"
                  {...register('ciudad')}
                  placeholder="Ej: Barranquilla"
                  aria-invalid={!!errors.ciudad}
                  aria-describedby={errors.ciudad ? 'ciudad-error' : undefined}
                  className="border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
                />
                {errors.ciudad && (
                  <p id="ciudad-error" role="alert" className="text-xs text-red-500 font-sans">
                    {errors.ciudad.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="departamento" className="text-xs tracking-wide font-sans">
                  Departamento *
                </Label>
                <Input
                  id="departamento"
                  {...register('departamento')}
                  placeholder="Ej: Atlántico"
                  aria-invalid={!!errors.departamento}
                  aria-describedby={errors.departamento ? 'departamento-error' : undefined}
                  className="border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
                />
                {errors.departamento && (
                  <p id="departamento-error" role="alert" className="text-xs text-red-500 font-sans">
                    {errors.departamento.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Aviso */}
          <div className="bg-[#F5EDD6] border border-[#E8D5A3] p-4">
            <p className="font-sans text-xs text-[#7A6130] leading-relaxed">
              🌹 Al presionar el botón se abrirá <strong>WhatsApp</strong> con tu pedido completo. El pago y la entrega se coordinan directamente con Linda Rosa Perfumes.
            </p>
          </div>

          <button
            id="send-whatsapp-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white text-sm tracking-[0.15em] uppercase py-4 transition-colors duration-200 disabled:opacity-60 font-sans"
            aria-label="Enviar pedido por WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Enviar pedido por WhatsApp
          </button>
        </form>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-[#F5F5F0] p-6 sticky top-24">
            <h2 className="font-heading text-xl text-[#1A1A1A] mb-1">Tu pedido</h2>
            <div className="w-8 h-px bg-[#C9A84C] mb-5" />

            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm font-sans">
                  <span className="text-[#666] truncate pr-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-[#1A1A1A] shrink-0">
                    {formatPriceCOP(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E5E5] pt-4">
              <div className="flex justify-between">
                <span className="font-sans font-medium text-sm">Total</span>
                <span className="font-sans font-bold text-[#1A1A1A]">{formatPriceCOP(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
