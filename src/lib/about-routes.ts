import {educationHref} from './education-routes';
/** Only pages fully incorporated into the unified company introduction. */
export const aboutRedirects: Record<string, string> = {
  '/about/company': '/about/#overview',
  '/about/founder': '/about/#ceo',
  '/about/difference': '/about/#difference',
};
export function aboutHref(href: string) {
  return aboutRedirects[href.replace(/\/$/, '')] || educationHref(href);
}
