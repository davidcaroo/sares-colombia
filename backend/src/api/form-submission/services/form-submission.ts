import type { Core } from '@strapi/strapi';

interface FormField {
  key: string;
  label: string;
}

interface FormDefinition {
  type: string;
  title: string;
  subject: string | ((payload: Record<string, unknown>) => string);
  required: string[];
  fields: FormField[];
}

export const FORM_DEFINITIONS: Record<string, FormDefinition> = {
  contact: {
    type: 'contact',
    title: 'Nuevo mensaje desde Contáctanos',
    subject: (payload) => `Contacto web - ${payload.name || 'Sin nombre'}`,
    required: ['name', 'email', 'message'],
    fields: [
      { key: 'name', label: 'Nombre completo' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'message', label: 'Mensaje' },
    ],
  },
  wholesale: {
    type: 'wholesale',
    title: 'Solicitud de convenio mayorista',
    subject: (payload) => `Solicitud mayorista - ${payload.businessName || payload.contactName || 'Sin nombre'}`,
    required: ['contactName', 'businessName', 'email', 'phone'],
    fields: [
      { key: 'contactName', label: 'Nombre de contacto' },
      { key: 'businessName', label: 'Negocio / Razón social' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'location', label: 'Ubicación' },
      { key: 'businessType', label: 'Tipo de negocio' },
      { key: 'details', label: 'Detalles adicionales' },
    ],
  },
  suggestion: {
    type: 'suggestion',
    title: 'Nuevo mensaje en Buzón de Sugerencias',
    subject: (payload) => `Sugerencia o consulta - ${payload.inquiryType || 'General'}`,
    required: ['name', 'email', 'message'],
    fields: [
      { key: 'name', label: 'Nombre' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'inquiryType', label: 'Tipo de consulta' },
      { key: 'message', label: 'Mensaje' },
    ],
  },
};

const escapeHtml = (value: unknown) => {
  if (value === null || value === undefined) {
    return 'Sin dato';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const formatFieldsHtml = (fields: FormField[], payload: Record<string, unknown>) =>
  fields
    .map((field) => `<p><strong>${field.label}:</strong> ${escapeHtml(payload[field.key])}</p>`)
    .join('\n');

const formatFieldsText = (fields: FormField[], payload: Record<string, unknown>) =>
  fields
    .map((field) => `${field.label}: ${payload[field.key] ?? 'Sin dato'}`)
    .join('\n');

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async send({ type, payload }: { type: string; payload: Record<string, unknown> }) {
    const definition = FORM_DEFINITIONS[type];

    if (!definition) {
      throw new Error(`Tipo de formulario no soportado: ${type}`);
    }

    const destination = process.env.FORMS_DESTINATION_EMAIL || process.env.SMTP_DEFAULT_REPLY_TO || process.env.SMTP_DEFAULT_FROM || 'administracion@sarescol.com';
    const submittedAt = new Date().toISOString();

    const subject = typeof definition.subject === 'function' ? definition.subject(payload) : definition.subject;
    const html = `
      <div>
        <h2>${definition.title}</h2>
        <p><strong>Tipo:</strong> ${definition.type}</p>
        ${formatFieldsHtml(definition.fields, payload)}
        <hr />
        <p style="font-size: 12px; color: #555;">Enviado el ${submittedAt}</p>
      </div>
    `;

    const text = [
      definition.title,
      `Tipo: ${definition.type}`,
      formatFieldsText(definition.fields, payload),
      `Enviado el ${submittedAt}`,
    ].join('\n\n');

    const replyToCandidate = typeof payload.email === 'string' ? payload.email.trim() : '';
    const replyTo = replyToCandidate || process.env.SMTP_DEFAULT_REPLY_TO || undefined;

    await strapi.plugins['email'].services.email.send({
      to: destination,
      subject,
      text,
      html,
      replyTo,
    });

    return { ok: true };
  },
});
