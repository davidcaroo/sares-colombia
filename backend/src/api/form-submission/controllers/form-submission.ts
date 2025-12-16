import { FORM_DEFINITIONS } from '../services/form-submission';

const isEmptyValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  return false;
};

export default {
  async submit(ctx) {
    const { type } = ctx.params;
    const definition = FORM_DEFINITIONS[type];

    if (!definition) {
      return ctx.badRequest('Tipo de formulario no soportado.');
    }

    const payload = ctx.request.body || {};
    const missingFields = definition.required.filter((field) => isEmptyValue(payload[field]));

    if (missingFields.length > 0) {
      return ctx.badRequest(`Faltan campos requeridos: ${missingFields.join(', ')}`);
    }

    try {
      await strapi.service('api::form-submission.form-submission').send({ type, payload });
      ctx.body = { ok: true };
    } catch (error) {
      strapi.log.error('Error enviando formulario', error);
      ctx.internalServerError('No se pudo enviar el formulario. Inténtalo más tarde.');
    }
  },
};
