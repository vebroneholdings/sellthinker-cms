import type { Core, UID } from '@strapi/strapi';

/*
 * Builds a populate object that fills in every component, dynamic-zone block,
 * nested element and media field of a model, read from the schema itself. New
 * blocks added to the model are picked up without touching this file.
 *
 * Relations are only populated on the top-level document (author, category),
 * so a page never drags in other articles' trees.
 */
type Populate = true | { populate?: Record<string, unknown>; on?: Record<string, unknown> };

export function deepPopulate(strapi: Core.Strapi, uid: string, depth = 0): Record<string, Populate> {
  const model = strapi.getModel(uid as UID.Schema);
  const out: Record<string, Populate> = {};
  if (!model || depth > 6) return out;

  for (const [name, attr] of Object.entries(model.attributes) as [string, any][]) {
    if (attr.type === 'component') {
      out[name] = nested(strapi, attr.component, depth);
    } else if (attr.type === 'dynamiczone') {
      out[name] = { on: Object.fromEntries(attr.components.map((c: string) => [c, nested(strapi, c, depth)])) };
    } else if (attr.type === 'media') {
      out[name] = true;
    } else if (attr.type === 'relation' && depth === 0 && !String(attr.target).startsWith('admin::')) {
      out[name] = true;
    }
  }
  return out;
}

function nested(strapi: Core.Strapi, uid: string, depth: number): Populate {
  const inner = deepPopulate(strapi, uid, depth + 1);
  return Object.keys(inner).length ? { populate: inner } : true;
}
