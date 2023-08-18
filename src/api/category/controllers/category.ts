/**
 * category controller
 */

import { factories } from '@strapi/strapi'
import {sanitize} from '@strapi/utils'

export default factories.createCoreController('api::category.category', ({ strapi }) =>  ({
  async find(ctx) {
    const { contentAPI } = sanitize;
    const contentType = strapi.contentType('api::category.category')
    const query = {
      ...ctx.query
    }

    const category = await strapi.entityService.findMany("api::category.category", query);

    const arrayResponse = await contentAPI.output(category, contentType, ctx.state.auth);
    return arrayResponse;
  },

  async findOne(ctx) {
    const { contentAPI } = sanitize;
    const { id } = ctx.params;
    const contentType = strapi.contentType('api::category.category')
    const query = {
      filters: {uid: id},
      ...ctx.query
    }

    const category = await strapi.entityService.findMany("api::category.category", query);

    const arrayResponse = await contentAPI.output(category, contentType, ctx.state.auth);
    return arrayResponse[0];
  }
}))
