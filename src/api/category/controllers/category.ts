/**
 * category controller
 */

import { factories, } from '@strapi/strapi'
import { sanitize } from '@strapi/utils'


export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx: any) {
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
      filters: { uid: id },
      ...ctx.query
    }

    const category = await strapi.entityService.findMany("api::category.category", query);

    const arrayResponse = await contentAPI.output(category, contentType, ctx.state.auth);
    return arrayResponse[0];
  },

  async update(ctx) {
    try {
      const findOneCategory = await this.findOne(ctx)

      if (!findOneCategory) return

      const id = findOneCategory.id
      const { body } = ctx.request;
      body.updatedAt = new Date()

      const updateCategory = await strapi.entityService.update("api::category.category", id, body)

      return updateCategory
    } catch (err) {
      console.log(err);
    }
  },

  async delete(ctx) {
    try {
      const findOneCategory = await this.findOne(ctx)

      if (!findOneCategory) return

      const id = findOneCategory.id
      await strapi.entityService.delete("api::category.category", id)

      ctx.send({}, 204)
    } catch (err) {
      console.log(err);
    }
  }
}))
