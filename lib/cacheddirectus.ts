import { Auth, Directus, TypeMap } from '@directus/sdk'
import {
  DirectusAccessibility,
  DirectusArticle,
  DirectusPopulations,
  DirectusProvider,
  DirectusServiceCategory,
  getDirectusAccessibility,
  getDirectusArticle,
  getDirectusArticles,
  getDirectusPopulationsServed,
  getDirectusProviders,
  getDirectusServiceCategories,
} from '@ircsignpost/signpost-base/dist/src/directus'
import { DIRECTUS_AUTH_TOKEN, DIRECTUS_COUNTRY_ID, DIRECTUS_INSTANCE } from './constants'


const __CACHED_SERVICES__ = "__CACHED_SERVICES__"
const __CACHED_SERVICES_LOCALE__ = "__CACHED_SERVICES_LOCALE__"

const __CACHED_ACCESSIBILITIES__ = "__CACHED_ACCESSIBILITIES__"
const __CACHED_PROVIDERS__ = "__CACHED_PROVIDERS__"
const __CACHED_SERVICE_TYPES__ = "__CACHED_SERVICE_TYPES__"
const __CACHED_POPULATIONS_SERVED__ = "__CACHED_POPULATIONS_SERVED__"


const cache = {}

class CachedDirectus {

  private connectorInstace: Directus<TypeMap, Auth> = null as any

  async connector() {
    if (!this.connectorInstace) {
      const directus = new Directus(DIRECTUS_INSTANCE)
      await directus.auth.static(DIRECTUS_AUTH_TOKEN)
      this.connectorInstace = directus
    }
    return this.connectorInstace
  }

  async articles() {
    const glb = cache as any
    const directus = await this.connector()
    let cached: DirectusArticle[] = glb[__CACHED_SERVICES__]
    if (!cached) {
      cached = await getDirectusArticles(DIRECTUS_COUNTRY_ID, directus)
      glb[__CACHED_SERVICES__] = cached
      console.log("Cache Services initialized.")
    }
    cached = cached || []

    for (const s of cached) {
      s.translations ??= []
    }

    return cached

  }
  async articlesLocale(locale: string) {

    const glb = cache as any
    const directus = await this.connector()

    let cachedServices: DirectusArticle[] = glb[__CACHED_SERVICES_LOCALE__]

    if (!cachedServices) {
      cachedServices = await getDirectusArticles(DIRECTUS_COUNTRY_ID, directus, locale)
      glb[__CACHED_SERVICES_LOCALE__] = cachedServices
      console.log("Cache Services initialized.")
    }

    cachedServices = cachedServices || []

    for (const s of cachedServices) {
      s.translations ??= []
    }

    return cachedServices

  }

  async article(id: number) {
    const cachedServices = await this.articles()
    let service = cachedServices.find(s => s.id == id) as DirectusArticle
    return service
  }

  async accessibilities() {
    const glb = cache as any
    const directus = await this.connector()
    let cached: DirectusAccessibility[] = glb[__CACHED_ACCESSIBILITIES__]
    if (!cached) {
      cached = await getDirectusAccessibility(directus)
      console.log("Accessibilities Cache initialized.")
      glb[__CACHED_ACCESSIBILITIES__] = cached
    }
    cached = cached || []
    return cached
  }

  async populationsServed() {
    const glb = cache as any
    const directus = await this.connector()
    let cached: DirectusPopulations[] = glb[__CACHED_POPULATIONS_SERVED__]
    if (!cached) {
      cached = await getDirectusPopulationsServed(directus)
      console.log("Populations Cache initialized.")
      glb[__CACHED_POPULATIONS_SERVED__] = cached
    }
    cached = cached || []
    return cached
  }

  async providers() {
    const glb = cache as any
    const directus = await this.connector()
    let cached: DirectusProvider[] = glb[__CACHED_PROVIDERS__]
    if (!cached) {
      cached = await getDirectusProviders(directus, DIRECTUS_COUNTRY_ID)
      console.log("Providers Cache initialized.")
      glb[__CACHED_PROVIDERS__] = cached
    }
    cached = cached || []
    return cached
  }

  async serviceCategories() {
    const glb = cache as any
    const directus = await this.connector()
    let cached: DirectusServiceCategory[] = glb[__CACHED_SERVICE_TYPES__]
    if (!cached) {
      cached = await getDirectusServiceCategories(directus)
      console.log("Categories Cache initialized.")
      glb[__CACHED_SERVICE_TYPES__] = cached
    }
    cached = cached || []
    return cached
  }

}

export const cachedDirectus = new CachedDirectus()