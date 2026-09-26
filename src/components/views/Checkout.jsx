import { useForm } from 'react-hook-form'
import { useCarritoContext } from '../../context/carritoContext'
import { formatearPrecio } from '../../utils/formato'

function Checkout({ onVolver, onConfirmar }) {
  const { carrito, total } = useCarritoContext()
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
      items: carrito,
      total,
    }

    onConfirmar(pedido)
  }

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-surface p-5 sm:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Checkout</p>
      <h1 className="mt-2 text-3xl font-bold">Confirmá tu compra</h1>
      <p className="mt-2 text-slate-400">Completá tu nombre para finalizar el pedido.</p>

      <div className="mt-6 space-y-3">
        {carrito.map((item) => (
          <div key={item.id} className="flex justify-between gap-4 rounded-xl bg-white/5 p-3 text-sm">
            <span>{item.nombre} x {item.cantidad}</span>
            <span>{formatearPrecio(item.precio * item.cantidad)}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
        <span>Total</span>
        <span className="text-brand">{formatearPrecio(total)}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <label htmlFor="nombreCompleto" className="block">
          <span className="text-sm text-slate-300">Nombre completo</span>
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
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.nombreCompleto && (
            <p id="nombreCompleto-error" className="mt-2 text-sm text-rose-300">
              {errors.nombreCompleto.message}
            </p>
          )}
        </label>

        <label htmlFor="email" className="mt-4 block">
          <span className="text-sm text-slate-300">Email</span>
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
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-rose-300">
              {errors.email.message}
            </p>
          )}
        </label>

        <label htmlFor="telefono" className="mt-4 block">
          <span className="text-sm text-slate-300">Teléfono</span>
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
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.telefono && (
            <p id="telefono-error" className="mt-2 text-sm text-rose-300">
              {errors.telefono.message}
            </p>
          )}
        </label>

        <fieldset className="mt-6">
          <legend className="text-sm text-slate-300">Método de envío</legend>
          <div className="mt-2 space-y-2">
            <label htmlFor="envioDomicilio" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
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
            <label htmlFor="retiroLocal" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
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
            <p id="metodoEnvio-error" className="mt-2 text-sm text-rose-300">
              {errors.metodoEnvio.message}
            </p>
          )}
        </fieldset>

        {metodoEnvio === 'domicilio' && (
          <label htmlFor="direccion" className="mt-4 block">
            <span className="text-sm text-slate-300">Dirección</span>
            <input
              id="direccion"
              type="text"
              aria-invalid={errors.direccion ? 'true' : 'false'}
              aria-describedby={errors.direccion ? 'direccion-error' : undefined}
              placeholder="Tu dirección de entrega"
              {...register('direccion', {
                required: 'La dirección es obligatoria para el envío a domicilio.',
              })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand focus:outline-none"
            />
            {errors.direccion && (
              <p id="direccion-error" className="mt-2 text-sm text-rose-300">
                {errors.direccion.message}
              </p>
            )}
          </label>
        )}

        <label htmlFor="notas" className="mt-4 block">
          <span className="text-sm text-slate-300">Notas (opcional)</span>
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
            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand focus:outline-none"
          />
          {errors.notas && (
            <p id="notas-error" className="mt-2 text-sm text-rose-300">
              {errors.notas.message}
            </p>
          )}
        </label>

        <label htmlFor="aceptaTerminos" className="mt-6 flex items-start gap-3 text-sm text-slate-300">
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
          <p id="aceptaTerminos-error" className="mt-2 text-sm text-rose-300">
            {errors.aceptaTerminos.message}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={onVolver}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Volver al carrito
          </button>
          <button
            type="submit"
            disabled={carrito.length === 0}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirmar pedido
          </button>
        </div>
      </form>
    </section>
  )
}

export default Checkout