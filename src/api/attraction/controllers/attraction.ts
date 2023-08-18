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
  },

  async update(ctx) {
    try {
      const findOneAttraction = await this.findOne(ctx)

      if (!findOneAttraction) return

      const id = findOneAttraction.id
      const { body } = ctx.request;
      body.updatedAt = new Date()

      await strapi.entityService.update("api::attraction.attraction", id, body)

      ctx.query = {
        populate: '*'
      }

      const returnFindOneAttraction = await this.findOne(ctx)

      return returnFindOneAttraction
    } catch (err) {
      console.log(err);
    }
  },

  async delete(ctx) {
    try {
      const findOneAttraction = await this.findOne(ctx)

      if (!findOneAttraction) return

      const id = findOneAttraction.id
      await strapi.entityService.delete("api::attraction.attraction", id)

      ctx.send({}, 204)
    } catch (err) {
      console.log(err);
    }
  }
}))