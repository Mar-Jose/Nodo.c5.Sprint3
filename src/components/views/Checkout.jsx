import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCarritoContext } from '../../context/carritoContext'
import { formatearPrecio } from '../../utils/formato'

function Checkout({ onVolver, onConfirmar }) {
  const { carrito, total } = useCarritoContext()
  const [cupon, setCupon] = useState('')
  const codigoCuponValido = cupon.trim().toUpperCase() === 'NODO10'
  const descuento = codigoCuponValido ? Math.round(total * 0.1) : 0
  const totalFinal = total - descuento
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      metodoEnvio: 'domicilio',
    },
  })
  const metodoEnvio = watch('metodoEnvio')

  const onSubmit = (datos) => {
    const pedido = {
      nombreCompleto: datos.nombreCompleto,
      email: datos.email,
      telefono: datos.telefono,
      metodoEnvio: datos.metodoEnvio,
      direccion: datos.metodoEnvio === 'domicilio' ? datos.direccion : null,
      notas: datos.notas || '',
      aceptaTerminos: datos.aceptaTerminos,
      cupon: codigoCuponValido ? 'NODO10' : null,
      descuento,
      items: carrito,
      total: totalFinal,
      subtotal: total,
    }

    onConfirmar(pedido)
  }

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-token-white/10 bg-token-indigo-950 p-4 text-token-white sm:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Checkout</p>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Confirmá tu compra</h1>
      <p className="mt-2 text-token-slate-400">Completá tu nombre para finalizar el pedido.</p>

      <div className="mt-6 space-y-3">
        {carrito.map((item) => (
          <div key={item.id} className="flex flex-wrap justify-between gap-2 rounded-xl bg-token-white/5 p-3 text-sm">
            <span className="min-w-0 break-words">{item.nombre} x {item.cantidad}</span>
            <span className="shrink-0">{formatearPrecio(item.precio * item.cantidad)}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-token-white/10 pt-4 text-sm">
        <div className="flex justify-between gap-3">
          <span>Subtotal</span>
          <span>{formatearPrecio(total)}</span>
        </div>
        {codigoCuponValido && (
          <div className="flex justify-between gap-3 text-token-emerald-200">
            <span>Descuento NODO10 (10%)</span>
            <span>−{formatearPrecio(descuento)}</span>
          </div>
        )}
        <div className="flex justify-between gap-3 pt-1 text-base font-bold sm:text-lg">
          <span>Total</span>
          <span className="text-brand">{formatearPrecio(totalFinal)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <label htmlFor="cupon" className="block">
          <span className="text-sm text-token-slate-300">Cupón de descuento</span>
          <input
            id="cupon"
            type="text"
            value={cupon}
            onChange={(event) => setCupon(event.target.value)}
            aria-describedby={cupon.length > 0 ? 'cupon-estado' : undefined}
            placeholder="Ingresá NODO10"
            autoComplete="off"
            className="mt-2 w-full rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 uppercase text-token-white placeholder:normal-case placeholder:text-token-slate-400 focus:border-brand focus:outline-none"
          />
          {cupon.length > 0 && (
            <p
              id="cupon-estado"
              role="status"
              className={`mt-2 text-sm ${
                codigoCuponValido ? 'text-token-emerald-200' : 'text-token-rose-300'
              }`}
            >
              {codigoCuponValido
                ? 'Cupón aplicado: 10% de descuento.'
                : 'El código ingresado no es válido.'}
            </p>
          )}
        </label>

        <label htmlFor="nombreCompleto" className="block">
          <span className="text-sm text-token-slate-300">Nombre completo</span>
          <input
            id="nombreCompleto"
            type="text"
            aria-invalid={errors.nombreCompleto ? 'true' : 'false'}
            aria-describedby={errors.nombreCompleto ? 'nombreCompleto-error' : undefined}
            placeholder="Tu nombre completo"
            {...register('nombreCompleto', {
              required: 'El nombre completo es obligatorio.',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres.',
              },
            })}
            className="mt-2 w-full rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 text-token-white placeholder:text-token-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.nombreCompleto && (
            <p id="nombreCompleto-error" className="mt-2 text-sm text-token-rose-300">
              {errors.nombreCompleto.message}
            </p>
          )}
        </label>

        <label htmlFor="email" className="mt-4 block">
          <span className="text-sm text-token-slate-300">Email</span>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="tu@email.com"
            {...register('email', {
              required: 'El email es obligatorio.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresá un email válido.',
              },
            })}
            className="mt-2 w-full rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 text-token-white placeholder:text-token-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-token-rose-300">
              {errors.email.message}
            </p>
          )}
        </label>

        <label htmlFor="telefono" className="mt-4 block">
          <span className="text-sm text-token-slate-300">Teléfono</span>
          <input
            id="telefono"
            type="text"
            aria-invalid={errors.telefono ? 'true' : 'false'}
            aria-describedby={errors.telefono ? 'telefono-error' : undefined}
            inputMode="numeric"
            placeholder="3812345678"
            {...register('telefono', {
              required: 'El teléfono es obligatorio.',
              pattern: {
                value: /^\d+$/,
                message: 'El teléfono solo puede contener números.',
              },
              minLength: {
                value: 8,
                message: 'El teléfono debe tener al menos 8 números.',
              },
            })}
            className="mt-2 w-full rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 text-token-white placeholder:text-token-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.telefono && (
            <p id="telefono-error" className="mt-2 text-sm text-token-rose-300">
              {errors.telefono.message}
            </p>
          )}
        </label>

        <fieldset className="mt-6">
          <legend className="text-sm text-token-slate-300">Método de envío</legend>
          <div className="mt-2 space-y-2">
            <label htmlFor="envioDomicilio" className="flex items-center gap-3 rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 text-sm text-token-slate-200">
              <input
                id="envioDomicilio"
                type="radio"
                aria-invalid={errors.metodoEnvio ? 'true' : 'false'}
                aria-describedby={errors.metodoEnvio ? 'metodoEnvio-error' : undefined}
                value="domicilio"
                {...register('metodoEnvio', {
                  required: 'Elegí un método de envío.',
                })}
                className="accent-brand"
              />
              Envío a domicilio
            </label>
            <label htmlFor="retiroLocal" className="flex items-center gap-3 rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 text-sm text-token-slate-200">
              <input
                id="retiroLocal"
                type="radio"
                aria-invalid={errors.metodoEnvio ? 'true' : 'false'}
                aria-describedby={errors.metodoEnvio ? 'metodoEnvio-error' : undefined}
                value="retiro"
                {...register('metodoEnvio', {
                  required: 'Elegí un método de envío.',
                })}
                className="accent-brand"
              />
              Retiro en el local
            </label>
          </div>
          {errors.metodoEnvio && (
            <p id="metodoEnvio-error" className="mt-2 text-sm text-token-rose-300">
              {errors.metodoEnvio.message}
            </p>
          )}
        </fieldset>

        {metodoEnvio === 'domicilio' && (
          <label htmlFor="direccion" className="mt-4 block">
            <span className="text-sm text-token-slate-300">Dirección</span>
            <input
              id="direccion"
              type="text"
              aria-invalid={errors.direccion ? 'true' : 'false'}
              aria-describedby={errors.direccion ? 'direccion-error' : undefined}
              placeholder="Tu dirección de entrega"
              {...register('direccion', {
                required: 'La dirección es obligatoria para el envío a domicilio.',
              })}
              className="mt-2 w-full rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 text-token-white placeholder:text-token-slate-400 focus:border-brand focus:outline-none"
            />
            {errors.direccion && (
              <p id="direccion-error" className="mt-2 text-sm text-token-rose-300">
                {errors.direccion.message}
              </p>
            )}
          </label>
        )}

        <label htmlFor="notas" className="mt-4 block">
          <span className="text-sm text-token-slate-300">Notas (opcional)</span>
          <textarea
            id="notas"
            rows="4"
            aria-invalid={errors.notas ? 'true' : 'false'}
            aria-describedby={errors.notas ? 'notas-error' : undefined}
            maxLength="200"
            placeholder="¿Querés agregar alguna indicación?"
            {...register('notas', {
              maxLength: {
                value: 200,
                message: 'Las notas no pueden superar los 200 caracteres.',
              },
            })}
            className="mt-2 w-full resize-y rounded-xl border border-token-white/10 bg-token-white/5 px-4 py-3 text-token-white placeholder:text-token-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.notas && (
            <p id="notas-error" className="mt-2 text-sm text-token-rose-300">
              {errors.notas.message}
            </p>
          )}
        </label>

        <label htmlFor="aceptaTerminos" className="mt-6 flex items-start gap-3 text-sm text-token-slate-300">
          <input
            id="aceptaTerminos"
            type="checkbox"
            aria-invalid={errors.aceptaTerminos ? 'true' : 'false'}
            aria-describedby={errors.aceptaTerminos ? 'aceptaTerminos-error' : undefined}
            {...register('aceptaTerminos', {
              required: 'Debés aceptar los términos para confirmar el pedido.',
            })}
            className="mt-1 accent-brand"
          />
          <span>Acepto los términos y condiciones.</span>
        </label>
        {errors.aceptaTerminos && (
          <p id="aceptaTerminos-error" className="mt-2 text-sm text-token-rose-300">
            {errors.aceptaTerminos.message}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={onVolver}
            className="rounded-full border border-token-white/10 bg-token-white/5 px-4 py-2 text-sm text-token-slate-200 transition hover:bg-token-white/10"
          >
            Volver al carrito
          </button>
          <button
            type="submit"
            disabled={carrito.length === 0}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-token-white transition hover:bg-brand/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirmar pedido
          </button>
        </div>
      </form>
    </section>
  )
}

export default Checkout