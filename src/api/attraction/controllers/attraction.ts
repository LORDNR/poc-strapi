/**
 * attraction controller
 */

import { factories } from '@strapi/strapi'
import { sanitize } from '@strapi/utils'

export default factories.createCoreController('api::attraction.attraction', ({ strapi }) => ({

  async find(ctx) {
    const { contentAPI } = sanitize;
    const contentType = strapi.contentType('api::attraction.attraction')
    const query = {
      ...ctx.query
    }

    const attraction = await strapi.entityService.findMany("api::attraction.attraction", query);

    const arrayResponse = await contentAPI.output(attraction, contentType, ctx.state.auth);
    return arrayResponse;
  },

  async findOne(ctx) {
    const { contentAPI } = sanitize;
    const { id } = ctx.params;
    const contentType = strapi.contentType('api::attraction.attraction')
    const query = {
      filters: { uid: id },
      ...ctx.query
    }

    const attraction = await strapi.entityService.findMany("api::attraction.attraction", query);

    const arrayResponse = await contentAPI.output(attraction, contentType, ctx.state.auth);
    return arrayResponse[0];
  }
}))